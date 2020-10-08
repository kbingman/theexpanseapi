use async_std::prelude::*;
use mongodb::bson::{doc, from_bson, to_bson, Bson};
use uuid::Uuid;

use tide::prelude::*; // Pulls in the json! macro. 
use tide::{Body, Request, Response};

use crate::messages;
use crate::state::State;
use crate::util::get_database;
use super::models::Person;

/// List people
pub(crate) async fn list(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("people");

    let mut cursor = collection.find(None, None).await?;
    let mut people = Vec::<Person>::new();

    while let Some(result) = cursor.next().await {
        let person: Person = from_bson(Bson::Document(result?))?;
        people.push(person);
    }

    Ok(Body::from_json(&people)?)
}

/// Find person
pub(crate) async fn show(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("people");

    let uuid: String = req.param("uuid")?;
    let filter = doc! { "uuid": &uuid };

    let result = collection.find_one(filter, None).await?;
    match result {
        Some(document) => {
            let person: Person = from_bson(Bson::Document(document))?;
            Ok(Body::from_json(&person)?)
        },
        // TODO Add the correct 404 status code 
        None => Ok(Body::from_json(&messages::not_found())?),
    }
}

/// Create person
pub(crate) async fn create(mut req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("people");

    let mut person: Person = req.body_json().await?;
    // Adds a `uuid` if none is found.
    person.uuid = match person.uuid {
        Some(_uuid) => person.uuid,
        None => Some(Uuid::new_v4())
    };

    let _result = collection.insert_one(from_bson(to_bson(&person)?)?, None).await?;
    Ok(Body::from_json(&person)?)
}

/// Update person
pub(crate) async fn update(mut req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("people");

    let mut person: Person = req.body_json().await?;
    let uuid: Uuid = req.param("uuid")?;
    person.uuid = Some(uuid);
    let filter = doc! { "uuid": uuid.to_string() };

    let document = to_bson(&person)?;

    if let Bson::Document(result) = document {
        let _result = collection.update_one(filter, result, None).await?;
        Ok(Body::from_json(&person)?)
    } else {
        Ok(Body::from_json(&messages::internal_error())?)
    }
}

/// Delete person
pub(crate) async fn remove(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("people");

    let uuid: Uuid = req.param("uuid")?;
    let filter = doc! { "uuid": uuid.to_string() };

    let _result = collection.delete_one(filter, None).await?;
    Ok(Body::from_json(&json!({ "uuid": uuid.to_string() }))?)
}
