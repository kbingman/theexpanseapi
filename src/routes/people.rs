use async_std::prelude::*;
use mongodb::bson::{doc, from_bson, Bson};

use tide::{Body, Request, Response};
use tide::prelude::*; // Pulls in the json! macro.

use crate::state::State;
use crate::models::Person;

/// List people
pub(crate) async fn list(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = &req.state().database("theexpanseapi-prod").collection("people");

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
    let collection = &req.state().database("theexpanseapi-prod").collection("people");

    let uuid: String = req.param("uuid")?;
    let filter = doc! { "uuid": &uuid };
    let result = collection.find_one(filter, None).await?.expect("Document not found");
    let person: Person = from_bson(Bson::Document(result))?;

    Ok(Body::from_json(&person)?)
}

#[derive(Deserialize, Serialize)]
struct Cat {
    name: String,
}

/// Create person
pub(crate) async fn create(mut req: Request<State>) -> tide::Result<impl Into<Response>> {
    // let collection = get_database(&req).collection("people");
    // let result = collection.insert_one(document, None).await?;
    // let person: Person = from_bson(Bson::Document(result))?;

    let cat: Cat = req.body_json().await?;

    // let cat = Cat {
    //     name: "chashu".into(),
    // };

    Ok(Body::from_json(&cat)?)
}
