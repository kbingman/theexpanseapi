use async_std::prelude::*;
use mongodb::{
    bson::{doc, from_bson, to_bson, Bson},
    options::FindOptions,
};
use uuid::Uuid;

use tide::prelude::*; // Pulls in the json! macro.
use tide::{Body, Request, Response};

use super::models::Spacecraft;
use crate::messages;
use crate::state::State;
use crate::util::get_database;

/// List spacecraft
pub async fn list(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("spacecraft");

    let find_options = FindOptions::builder().limit(50).build();
    let mut cursor = collection.find(None, find_options).await?;
    let mut spacecraft = Vec::<Spacecraft>::new();

    while let Some(result) = cursor.next().await {
        let craft: Spacecraft = from_bson(Bson::Document(result?))?;
        spacecraft.push(craft);
    }

    Ok(Body::from_json(&spacecraft)?)
}

/// Find spacecraft
pub async fn show(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("spacecraft");

    let uuid: String = req.param("uuid")?;
    let filter = doc! { "uuid": &uuid };

    let result = collection.find_one(filter, None).await?;
    match result {
        Some(document) => {
            let spacecraft: Spacecraft = from_bson(Bson::Document(document))?;
            Ok(Body::from_json(&spacecraft)?)
        }
        // TODO Add the correct 404 status code
        None => Ok(Body::from_json(&messages::not_found())?),
    }
}

/// Create spacecraft
pub async fn create(mut req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("spacecraft");

    let mut spacecraft: Spacecraft = req.body_json().await?;
    // Adds a `uuid` if none is found.
    spacecraft.uuid = match spacecraft.uuid {
        Some(_uuid) => spacecraft.uuid,
        None => Some(Uuid::new_v4()),
    };

    let _result = collection
        .insert_one(from_bson(to_bson(&spacecraft)?)?, None)
        .await?;
    Ok(Body::from_json(&spacecraft)?)
}

/// Update spacecraft
pub async fn update(mut req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("spacecraft");

    let mut spacecraft: Spacecraft = req.body_json().await?;
    let uuid: Uuid = req.param("uuid")?;
    spacecraft.uuid = Some(uuid);
    let filter = doc! { "uuid": uuid.to_string() };

    let document = to_bson(&spacecraft)?;

    if let Bson::Document(result) = document {
        let _result = collection.update_one(filter, result, None).await?;
        Ok(Body::from_json(&spacecraft)?)
    } else {
        Ok(Body::from_json(&messages::internal_error())?)
    }
}

/// Delete person
pub async fn remove(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("people");

    let uuid: Uuid = req.param("uuid")?;
    let filter = doc! { "uuid": uuid.to_string() };

    let _result = collection.delete_one(filter, None).await?;
    Ok(Body::from_json(&json!({ "uuid": uuid.to_string() }))?)
}
