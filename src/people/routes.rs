use async_std::prelude::*;
use mongodb::bson::{doc, from_bson, to_bson, Bson};

use tide::{Body, Request, Response};
use tide::prelude::*; // Pulls in the json! macro.

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

#[derive(Deserialize, Serialize)]
struct Message {
    message: String,
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
        None => {
            let message = Message {
                message: "Document not found".into()
            };
            Ok(Body::from_json(&message)?)
        },
    }
}

/// Create person
pub(crate) async fn create(mut req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("people");

    println!("create person");
    let person: Person = req.body_json().await?;
    // TODO add UUID if missing
    // TODO validate data
    // let document = to_bson(&person)?;
    let result = collection.insert_one(from_bson(to_bson(&person)?)?, None).await?;
    println!("result: {:#?}", result);
    Ok(Body::from_json(&person)?)

    // match result {
    //     Ok(_) => {
    //         println!("result: {:#?}", result);
    //         Ok(Body::from_json(&person)?)
    //     },
    //     _ => {
    //         let message = Message {
    //             message: "Something went wrong".into()
    //         };
    //         Ok(Body::from_json(&message)?)
    //     },
    // }
}
