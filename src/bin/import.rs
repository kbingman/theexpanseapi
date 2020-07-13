use std::{env, fs};
use dotenv::dotenv;
use clap::Clap;
use serde_json;
use uuid::Uuid;
use mongodb::bson::{to_bson};

use lib::models::{HasUUID, Person, Spacecraft, SpacecraftClass};
use lib::state::State;

#[derive(Clap)]
#[clap(version = "1.0", author = "Keith Bingman. <kbingman@gmail.com>")]
struct Opts {
    input: String,
}

#[derive(Debug)]
enum Output {
  People(Vec<Person>),
  Spacecraft(Vec<Spacecraft>),
  SpacecraftClass(Vec<SpacecraftClass>),
}

/// Cleans the filename to provide a key for determining structs
fn sanitize_key(str: &str) -> String {
    str.replace("fixtures/", "").replace(".json", "")
}

/// Converts a JSON string to the given struct type
fn convert_json<'de, T: serde::de::Deserialize<'de>>(string: &'de str) -> tide::Result<Vec<T>> {
    let data: Vec<T> = serde_json::from_str(string)?;
    Ok(data)
}

/// Matches the struct type of the JSON and converts to a struct
fn convert_data(key: String, string: String) -> tide::Result<Output> {
    let data = match key.as_str() {
        "class" => Output::SpacecraftClass(convert_json::<SpacecraftClass>(&string)?),
        "people" => Output::People(convert_json::<Person>(&string)?),
        "spacecraft" => Output::Spacecraft(convert_json::<Spacecraft>(&string)?),
        _ => Output::People(Vec::new()),
    };
    Ok(data)
}

fn iterator<T: HasUUID>(vector: Vec<T>) {
    for s in vector {
        // s.set_uuid(Uuid::new_v4());
        // let _serialized_document = to_bson(&s);
        println!("{}, {:#?}", s.get_name(), s.get_uuid());
    }
}

#[async_std::main]
async fn main() -> tide::Result<()> {
    dotenv()?;

    let db_uri = env::var("MONGODB_URI")?;
    let _state = State::new(&db_uri).await?;

    let opts: Opts = Opts::parse();
    let filename = opts.input;
    // let re = Regex::new(r"\-\d")?;
    let key = sanitize_key(&filename);
    let string = fs::read_to_string(&filename)?;
    let data = convert_data(key, string)?;

    match data {
      Output::People(_) => {
        println!("{:#?}", "people");
      }, 
      Output::Spacecraft(vector) => {
        for mut s in vector {
            s.uuid = Some(Uuid::new_v4());
            let _serialized_document = to_bson(&s);
            println!("{}, {:#?}", s.name, s.uuid);
        }
      }, 
      Output::SpacecraftClass(vector) => {
        for mut s in vector {
            s.uuid = Some(Uuid::new_v4());
            let _serialized_document = to_bson(&s);
            println!("{:#?}", s);
        }
      }, 
    }

    Ok(())
}
