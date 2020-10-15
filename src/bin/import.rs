use anyhow::Result;
use clap::Clap;
use dotenv::dotenv;
use serde_json;
use std::{env, fs};
use uuid::Uuid;

use mongodb::{bson::{doc, to_bson, Bson}, Collection};

use lib::people::models::Person;
use lib::spacecraft::models::{Spacecraft, SpacecraftClass};

#[derive(Clap)]
#[clap(version = "1.0", author = "Keith Bingman. <kbingman@gmail.com>")]
struct Opts {
    /// Some input. Because this isn't an Option<T> it's required to be used
    input: String,
}

fn fixture_path(name: &str) -> String {
    format!("fixtures/{}.json", name)
}

fn find_uuid(
    result: Option<mongodb::bson::Document>,
) -> Result<String> {
    let uuid = match result {
        Some(document) => match document.get("uuid") {
            Some(id) => match id.as_str() {
                Some(i) => i.to_string(),
                None => Uuid::new_v4().to_string(),
            },
            None => Uuid::new_v4().to_string(),
        },
        None => Uuid::new_v4().to_string(),
    };
    Ok(uuid)
}

async fn update_model<T: serde::ser::Serialize>(
    collection: &Collection,
    filter: mongodb::bson::Document,
    model: &T,
) -> Result<Option<mongodb::results::UpdateResult>> {
    let options = mongodb::options::UpdateOptions::builder()
        .upsert(true)
        .build();

    let document = to_bson(&model)?;
    if let Bson::Document(bson_doc) = document {
        let result = collection
            .update_one(filter, bson_doc, options)
            .await?;
        Ok(Some(result))
    } else {
        println!("Error updating {:#?}", filter);
        Ok(None)
    }
}

#[async_std::main]
async fn main() -> Result<()> {
    dotenv()?;
    let opts: Opts = Opts::parse();
    let model_name = opts.input;
    // Gets a value for config if supplied by user, or defaults to "default.conf"
    let string_data = fs::read_to_string(fixture_path(&model_name))?;

    let db_uri = env::var("MONGODB_URI")?;
    let client = mongodb::Client::with_uri_str(&db_uri).await?;
    let db = client.database("theexpanseapi-prod");
    let collection = db.collection(&model_name);

    match model_name.as_ref() {
        "spacecraft" => {
            let data: Vec<Spacecraft> = serde_json::from_str(&string_data)?;
            let people_collection = db.collection("people");
            let classes_collection = db.collection("classes");
            for mut model in data {
                let document = collection.find_one(doc! { "name": &model.name }, None).await?;
                let uuid = find_uuid(document)?;
                // Adding Crew IDs
                let mut crew_ids: Vec<String> = Vec::new();
                for name in &model.crew {
                    let crew = people_collection.find_one(doc! { "name": name }, None).await?;
                    let id = find_uuid(crew)?;
                    println!("Crew: {} {}", &name, &id);
                    crew_ids.push(id);
                }
                model.uuid = Some(uuid::Uuid::parse_str(&uuid)?);
                model.crew = crew_ids;
                // Adding Spacecraft Class IDs
                model.class = match model.class {
                    Some(class) => {
                        let doc = classes_collection.find_one(doc! { "name": class }, None).await?;
                        let id = find_uuid(doc)?;
                        Some(id)
                    }, 
                    None => None,
                };
                update_model(&collection, doc! { "name": &model.name }, &model).await?;
                println!("Name: {:#?}", &model.name);
            }
        },
        "classes" => {
            let data: Vec<SpacecraftClass> = serde_json::from_str(&string_data)?;
            for mut model in data {
                let document = collection.find_one(doc! { "name": &model.name }, None).await?;
                let uuid = find_uuid(document)?;
                model.uuid = Some(uuid::Uuid::parse_str(&uuid)?);
                update_model(&collection, doc! { "name": &model.name }, &model).await?;
                println!("Name: {:#?}", &model.name);
            }
        },
        "people" => {
            let data: Vec<Person> = serde_json::from_str(&string_data)?;
            for mut model in data {
                let document = collection.find_one(doc! { "name": &model.name }, None).await?;
                let uuid = find_uuid(document)?;
                model.uuid = Some(uuid::Uuid::parse_str(&uuid)?);
                update_model(&collection, doc! { "name": &model.name }, &model).await?;
                println!("Name: {:#?}", &model.name);
            }
        },
        _ => println!("No matching data found"),
    }

    Ok(())
}
