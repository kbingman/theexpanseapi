//! Application endpoints.

use async_std::prelude::*;
use mongodb::{bson::{doc, from_bson, Bson}, options::FindOptions};

use tide::{Body, Request, Response};

use super::state::State;
use super::models::Person;
use super::models::Spacecraft;
use tide::prelude::*; // Pulls in the json! macro.

fn get_database(req: &Request<State>) -> mongodb::Database {
    req
        .state()
        .mongo()
        .database("theexpanseapi-prod")
}

/// Find spacecraft
pub(crate) async fn find_spacecraft(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("spacecraft");

    let uuid: String = req.param("uuid")?;
    let filter = doc! { "uuid": &uuid };

    let result = collection.find_one(filter, None).await?.expect("Document not found");
    let spacecraft: Spacecraft = from_bson(Bson::Document(result))?;

    Ok(Body::from_json(&spacecraft)?)
}

/// List spacecraft
pub(crate) async fn list_spacecraft(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("spacecraft");

    let find_options = FindOptions::builder().limit(10).build();
    let mut cursor = collection.find(None, find_options).await?;
    let mut spacecraft = Vec::<Spacecraft>::new();

    while let Some(result) = cursor.next().await {
        let craft: Spacecraft = from_bson(Bson::Document(result?))?;
        spacecraft.push(craft);
    }

    Ok(Body::from_json(&spacecraft)?)
}

/// List spacecraft classes
pub(crate) async fn list_people(req: Request<State>) -> tide::Result<impl Into<Response>> {
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
pub(crate) async fn find_people(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("people");

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
pub(crate) async fn create_person(mut req: Request<State>) -> tide::Result<impl Into<Response>> {
    // let collection = get_database(&req).collection("people");
    // let result = collection.insert_one(document, None).await?;
    // let person: Person = from_bson(Bson::Document(result))?;

    let cat: Cat = req.body_json().await?;

    // let cat = Cat {
    //     name: "chashu".into(),
    // };

    Ok(Body::from_json(&cat)?)
}
