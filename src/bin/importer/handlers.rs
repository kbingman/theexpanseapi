use anyhow::Result;
use mongodb::bson::doc;

use crate::util::{find_uuid, update_model};
use lib::people::models::Person;
use lib::spacecraft::models::{Spacecraft, SpacecraftClass};
use lib::{db::find_one, episodes::models::Episode};

pub async fn import_spacecraft(db: mongodb::Database, string_data: &str) -> Result<()> {
    let collection = db.collection("spacecraft");
    let people_collection = db.collection("people");
    let classes_collection = db.collection("classes");

    let data: Vec<Spacecraft> = serde_json::from_str(&string_data)?;
    for mut model in data {
        let document = collection
            .find_one(doc! { "name": &model.name }, None)
            .await?;
        let uuid = find_uuid(document)?;
        // Adding Crew IDs
        let mut crew_ids: Vec<String> = Vec::new();
        for name in &model.crew {
            let crew = people_collection
                .find_one(doc! { "name": name }, None)
                .await?;
            let id = find_uuid(crew)?;
            println!("Crew: {} {}", &name, &id);
            crew_ids.push(id);
        }
        model.uuid = uuid::Uuid::parse_str(&uuid)?;
        model.crew = crew_ids;
        // Adding Spacecraft Class IDs
        model.class = match model.class {
            Some(class) => {
                let doc = classes_collection
                    .find_one(doc! { "name": class }, None)
                    .await?;
                let id = find_uuid(doc)?;
                Some(id)
            }
            None => None,
        };
        update_model(&collection, doc! { "name": &model.name }, &model).await?;
        println!("Name: {:#?}", &model.name);
    }
    Ok(())
}

pub async fn import_classes(db: mongodb::Database, string_data: &str) -> Result<()> {
    let collection = db.collection("classes");
    let data: Vec<SpacecraftClass> = serde_json::from_str(&string_data)?;
    for mut model in data {
        let document = collection
            .find_one(doc! { "name": &model.name }, None)
            .await?;
        let uuid = find_uuid(document)?;
        model.uuid = Some(uuid::Uuid::parse_str(&uuid)?);
        update_model(&collection, doc! { "name": &model.name }, &model).await?;
        println!("Name: {:#?}", &model.name);
    }
    Ok(())
}

async fn find_episode_id(
    collection: &mongodb::Collection,
    title: Option<String>,
) -> Result<Option<String>> {
    match title {
        Some(t) => {
            let doc = find_one(collection, doc! { "title": t }, None).await?;
            let id = find_uuid(doc)?;
            Ok(Some(id))
        }
        None => Ok(None),
    }
}

pub async fn import_people(db: mongodb::Database, string_data: &str) -> Result<()> {
    let collection = db.collection("people");
    let episode_collection = db.collection("episodes");
    let data: Vec<Person> = serde_json::from_str(&string_data)?;
    for mut model in data {
        let document = collection
            .find_one(doc! { "name": &model.name }, None)
            .await?;
        let uuid = find_uuid(document)?;
        model.uuid = Some(uuid::Uuid::parse_str(&uuid)?);
        model.first_appearance =
            find_episode_id(&episode_collection, model.first_appearance).await?;
        model.last_appearance = find_episode_id(&episode_collection, model.last_appearance).await?;
        println!("First Appeared: {:#?}", model.first_appearance);
        println!("Last Appeared: {:#?}", model.last_appearance);
        update_model(&collection, doc! { "name": &model.name }, &model).await?;
        println!("Name: {:#?}", &model.name);
    }
    Ok(())
}

pub async fn import_episodes(db: mongodb::Database, string_data: &str, season: &str) -> Result<()> {
    let collection = db.collection("episodes");
    let data: Vec<Episode> = serde_json::from_str(&string_data)?;
    for mut model in data {
        let document = collection
            .find_one(doc! { "title": &model.title }, None)
            .await?;
        let uuid = find_uuid(document)?;
        model.uuid = Some(uuid::Uuid::parse_str(&uuid)?);
        model.season = Some(season.parse::<i16>()?);
        update_model(&collection, doc! { "title": &model.title }, &model).await?;
        println!("Name: {:#?}, {:#?}", &model.title, &model.season);
    }
    Ok(())
}
