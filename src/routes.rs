//! Application endpoints.

use async_std::prelude::*;
use mongodb::bson::{doc, from_bson, Bson};

use tide::{Request, Response};

use super::state::State;
use super::models::Person;
use super::models::Spacecraft;

/// List all databases
pub(crate) async fn list_dbs(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let names = req.state().mongo().list_database_names(None, None).await?;
    Ok(names.join("\n"))
}

fn get_database(req: &Request<State>) -> mongodb::Database {
    req
        .state()
        .mongo()
        .database("theexpanseapi-prod")
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

    Ok(Response::new(tide::http::StatusCode::Ok).body_json(&people)?)
}

/// Find person
pub(crate) async fn find_people(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("people");

    let uuid: String = req.param("uuid")?;
    let filter = doc! { "uuid": &uuid };
    let result = collection.find_one(filter, None).await?.expect("Document not found");
    let person: Person = from_bson(Bson::Document(result))?;

    Ok(Response::new(tide::http::StatusCode::Ok).body_json(&person)?)
}

/// Find spacecraft
pub(crate) async fn find_spacecraft(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("spacecraft");

    let uuid: String = req.param("uuid")?;
    let filter = doc! { "uuid": &uuid };
    let result = collection.find_one(filter, None).await?.expect("Document not found");
    let spacecraft: Spacecraft = from_bson(Bson::Document(result))?;

    Ok(Response::new(tide::http::StatusCode::Ok).body_json(&spacecraft)?)
}

/// List spacecraft
pub(crate) async fn list_spacecraft(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("spacecraft");

    let mut cursor = collection.find(None, None).await?;
    let mut spacecraft = Vec::<Spacecraft>::new();

    while let Some(result) = cursor.next().await {
        let craft: Spacecraft = from_bson(Bson::Document(result?))?;
        spacecraft.push(craft);
    }

    Ok(Response::new(tide::http::StatusCode::Ok).body_json(&spacecraft)?)
}

/// Get a single database
pub(crate) async fn list_colls(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let name: String = req.param("db")?;
    log::info!("accessing database {}", name);
    let db = req.state().mongo().database(&name);
    let collections = db.list_collection_names(None).await?;
    Ok(collections.join("\n"))
}
