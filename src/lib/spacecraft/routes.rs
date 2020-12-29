use mongodb::{
    bson::{doc, from_bson, to_bson},
    options::FindOptions,
};
use uuid::Uuid;

use tide::prelude::*; // Pulls in the json! macro.
use tide::{Body, Request, Response};

use crate::db::{find_all, find_one, update_one};
use crate::messages;
use crate::state::State;
use crate::util::get_database;

use super::models::{Spacecraft, SpacecraftClass};
use super::util::{find_spacecraft_detail};

/// List Spacecraft Classes
pub async fn list_spacecraft_classes(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("classes");
    let spacecraft_classes: Vec<SpacecraftClass> = find_all(collection, None, None).await?;

    Ok(Body::from_json(&spacecraft_classes)?)
}

/// List spacecraft
pub async fn list(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("spacecraft");

    let find_options = FindOptions::builder()
        .skip(0)
        .limit(50)
        .sort(doc! { "name": 1 })
        .build();
    let spacecraft: Vec<Spacecraft> = find_all(collection, None, find_options).await?;

    Ok(Body::from_json(&spacecraft)?)
}

/// Find spacecraft
pub async fn show(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let db = get_database(&req);
    let collection = db.collection("spacecraft");

    let uuid: String = req.param("uuid")?;
    let filter = doc! { "uuid": &uuid };

    let result: Option<Spacecraft> = find_one(&collection, filter, None).await?;
    match result {
        Some(spacecraft) => Ok(Body::from_json(
            &find_spacecraft_detail(&db, spacecraft).await?,
        )?),
        // TODO Add the correct 404 status code
        None => Ok(Body::from_json(&messages::not_found())?),
    }
}

// /// Create spacecraft
// pub async fn create(mut req: Request<State>) -> tide::Result<impl Into<Response>> {
//     let collection = get_database(&req).collection("spacecraft");
//
//     let mut spacecraft: Spacecraft = req.body_json().await?;
//     // Adds a `uuid` if none is found.
//     spacecraft.uuid = match spacecraft.uuid {
//         Some(_uuid) => spacecraft.uuid,
//         None => Some(Uuid::new_v4()),
//     };
//
//     collection
//         .insert_one(from_bson(to_bson(&spacecraft)?)?, None)
//         .await?;
//     Ok(Body::from_json(&spacecraft)?)
// }

/// Update spacecraft
pub async fn update(mut req: Request<State>) -> tide::Result<impl Into<Response>> {
    let mut spacecraft: Spacecraft = req.body_json().await?;
    let uuid: Uuid = req.param("uuid")?;
    spacecraft.uuid = uuid;
    let filter = doc! { "uuid": uuid.to_string() };

    let db = get_database(&req);
    let collection = db.collection("spacecraft");
    let result: Option<Spacecraft> = update_one(collection, spacecraft, filter, None).await?;
    match result {
        Some(spacecraft) => Ok(Body::from_json(
            &find_spacecraft_detail(&db, spacecraft).await?,
        )?),
        None => Ok(Body::from_json(&messages::internal_error())?),
    }
}

// /// Delete spacecraft
// pub async fn remove(req: Request<State>) -> tide::Result<impl Into<Response>> {
//     let collection = get_database(&req).collection("people");
//
//     let uuid: Uuid = req.param("uuid")?;
//     let filter = doc! { "uuid": uuid.to_string() };
//
//     let _result = collection.delete_one(filter, None).await?;
//     Ok(Body::from_json(&json!({ "uuid": uuid }))?)
// }
