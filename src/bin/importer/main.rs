mod handlers;
mod util;

use anyhow::Result;
use clap::Clap;
use dotenv::dotenv;
use regex::Regex;
use std::{env, fs};

use crate::handlers::{import_classes, import_episodes, import_people, import_spacecraft};

#[derive(Clap)]
#[clap(version = "1.0", author = "Keith Bingman. <kbingman@gmail.com>")]
struct Opts {
    input: String,
}

fn fixture_path(name: &str) -> String {
    format!("fixtures/{}.json", name)
}

#[async_std::main]
async fn main() -> Result<()> {
    dotenv()?;
    let opts: Opts = Opts::parse();
    let file_name = opts.input;
    let model_name = Regex::new(r"\-\d")?.replace(&file_name, "");
    let season = Regex::new(r"\w+\-")?.replace(&file_name, "");
    let string_data = fs::read_to_string(fixture_path(&file_name))?;

    let db_uri = env::var("MONGODB_URI")?;
    let client = mongodb::Client::with_uri_str(&db_uri).await?;
    let db = client.database("theexpanseapi-prod");

    match model_name.as_ref() {
        "spacecraft" => import_spacecraft(db, &string_data).await?,
        "classes" => {
            import_classes(db, &string_data).await?;
        }
        "people" => {
            import_people(db, &string_data).await?;
        }
        "season" => {
            import_episodes(db, &string_data, &season).await?;
        }
        _ => println!("no matching importer for {}", model_name),
    }

    Ok(())
}
