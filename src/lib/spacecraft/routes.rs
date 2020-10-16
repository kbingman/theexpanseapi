use async_std::prelude::*;
use mongodb::{
    bson::{doc, from_bson, to_bson, Bson},
    options::FindOptions,
};
use uuid::Uuid;

use tide::prelude::*; // Pulls in the json! macro.
use tide::{Body, Request, Response};

use crate::messages;
use crate::people::routes::find_people;
use crate::state::State;
use crate::util::{format_url, get_database};

use super::db::find_spacecraft_class;
use super::models::{Spacecraft, SpacecraftDetail};

async fn find_thing(
    db: &mongodb::Database,
    document: mongodb::bson::Document,
) -> anyhow::Result<SpacecraftDetail> {
    let spacecraft: Spacecraft = from_bson(Bson::Document(document))?;
    let detail = SpacecraftDetail {
        name: spacecraft.name,
        owner: spacecraft.owner_navy,
        url: format_url("spacecraft", &spacecraft.uuid),
        class: match &spacecraft.class {
            Some(id) => find_spacecraft_class(&db, doc! { "uuid": &id }).await?,
            None => None,
        },
        crew: find_people(&db, doc! { "uuid": { "$in": &spacecraft.crew } }).await?,
    };
    Ok(detail)
}

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
    let records = spacecraft
        .iter()
        .map(|s| {
            let mut ship = s.clone();
            ship.url = format_url("spacecraft", &s.uuid);
            ship.class = format_url("class", &s.class);
            ship.crew = s
                .crew
                .iter()
                .map(|id| format!("/people/{}", id))
                .collect::<Vec<String>>();
            return ship;
        })
        .collect::<Vec<Spacecraft>>();

    Ok(Body::from_json(&records)?)
}

/// Find spacecraft
pub async fn show(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let db = get_database(&req);

    let uuid: String = req.param("uuid")?;
    let filter = doc! { "uuid": &uuid };

    let collection = db.collection("spacecraft");
    let result = collection.find_one(filter, None).await?;
    match result {
        Some(document) => Ok(Body::from_json(&find_thing(&db, document).await?)?),
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
