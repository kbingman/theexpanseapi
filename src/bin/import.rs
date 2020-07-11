use std::fs;
use clap::Clap;
use serde_json;

use lib::models::{Person, Spacecraft};

#[derive(Clap)]
#[clap(version = "1.0", author = "Keith Bingman. <kbingman@gmail.com>")]
struct Opts {
    input: String,
}

#[derive(Debug)]
enum Output {
  People(Vec<Person>),
  Spacecraft(Vec<Spacecraft>),
}

fn convert_json<'de, T: serde::de::Deserialize<'de>>(string: &'de str) -> tide::Result<Vec<T>> {
    let data: Vec<T> = serde_json::from_str(string)?;
    Ok(data)
}

fn main() -> tide::Result<()> {
    let opts: Opts = Opts::parse();
    let filename = opts.input;
    let key = filename.replace("fixtures/", "").replace(".json", "");
    let string = fs::read_to_string(&filename)?;

    let data: Output = match key.as_str() {
        "people" => Output::People(convert_json::<Person>(&string)?),
        "spacecraft" => Output::Spacecraft(convert_json::<Spacecraft>(&string)?),
        _ => Output::People(Vec::new()),
    };
    println!("{:#?}", data);
    Ok(())
}
