use mongodb::{bson::doc, options::FindOptions};

// use serde::de::DeserializeOwned;

use tide::{Body, Request, Response};

use crate::db::find_all;
use crate::state::State;
use crate::util::get_database;

use super::models::Episode;

/// List Episode Classes
pub async fn list(req: Request<State>) -> tide::Result<impl Into<Response>> {
    let collection = get_database(&req).collection("episodes");
    let find_options = FindOptions::builder().sort(doc! { "episode": 1 }).build();
    let spacecraft_classes: Vec<Episode> = find_all(collection, None, find_options).await?;

    Ok(Body::from_json(&spacecraft_classes)?)
}
