use std::fs;
use clap::Clap;
use serde_json;

use lib::models::{Person, Spacecraft, SpacecraftClass};

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

fn main() -> tide::Result<()> {
    let opts: Opts = Opts::parse();
    let filename = opts.input;
    // let re = Regex::new(r"\-\d")?;
    let key = sanitize_key(&filename);
    let string = fs::read_to_string(&filename)?;

    let data: Output = match key.as_str() {
        "class" => Output::SpacecraftClass(convert_json::<SpacecraftClass>(&string)?),
        "people" => Output::People(convert_json::<Person>(&string)?),
        "spacecraft" => Output::Spacecraft(convert_json::<Spacecraft>(&string)?),
        _ => Output::People(Vec::new()),
    };
    println!("{:#?}", data);
    Ok(())
}
