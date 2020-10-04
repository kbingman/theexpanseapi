use async_std::prelude::*;
use mongodb::{bson::{doc, from_bson, Bson}, options::FindOptions};
use serde::{Deserialize, Serialize};

use tide::{Body, Request, Response};

use crate::state::State;
use super::models::Spacecraft;

/// List spacecraft
pub(crate) async fn list(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = &req.state().database("theexpanseapi-prod").collection("spacecraft");

    let find_options = FindOptions::builder().limit(50).build();
    let mut cursor = collection.find(None, find_options).await?;
    let mut spacecraft = Vec::<Spacecraft>::new();

    while let Some(result) = cursor.next().await {
        let craft: Spacecraft = from_bson(Bson::Document(result?))?;
        spacecraft.push(craft);
    }

    Ok(Body::from_json(&spacecraft)?)
}

#[derive(Deserialize, Serialize)]
struct Message {
    message: String,
}

/// Find spacecraft
pub(crate) async fn show(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = &req.state().database("theexpanseapi-prod").collection("spacecraft");

    let uuid: String = req.param("uuid")?;
    let filter = doc! { "uuid": &uuid };

    let result = collection.find_one(filter, None).await?;
    match result {
        Some(document) => {
            let spacecraft: Spacecraft = from_bson(Bson::Document(document))?;
            Ok(Body::from_json(&spacecraft)?)
        },
        None => {
          let message = Message {
              message: "Document not found".into()
          };
          Ok(Body::from_json(&message)?)
        },
    }
}
