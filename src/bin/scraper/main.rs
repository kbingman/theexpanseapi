use scraper::{ElementRef, Html, Selector};
use serde::{Deserialize, Serialize};
use std::fs;
use surf::Result;

const BASE_URL: &str = "https://expanse.fandom.com";

fn get_episode_title_cell(row: &ElementRef) -> Option<String> {
     let cell_selector = Selector::parse("td:nth-of-type(1) a").unwrap();
     match row.select(&cell_selector).next() {
         Some(title_cell) => {
             let title = title_cell.text().collect::<Vec<_>>()[0];
             Some(title.to_string())
         },
         None => None,
     }
}

fn get_episodes_table(document: &Html) -> anyhow::Result<Vec<String>> {
    let selector = Selector::parse(".mw-collapsible tr").unwrap();
 
    let mut episodes: Vec<String> = Vec::new();
    for row in document.select(&selector) {
        let appears_selector = Selector::parse("td:nth-of-type(2)").unwrap();
        match row.select(&appears_selector).next() {
            Some(appears_cell) => {
                let appeared = appears_cell.text().collect::<Vec<_>>()[0];
                if appeared == "Appears" {
                    match get_episode_title_cell(&row) {
                        Some(title) => episodes.push(title),
                        None => {},
                    }
                }
            },
            None => {},
        }
    }

    Ok(episodes)
}

fn get_episodes_li(document: &Html) -> anyhow::Result<Vec<String>> {
    let selector =
        Selector::parse("h2 + h3 + ul li, h2 + p + ul li, .appearances-season-div li").unwrap();

    let mut episodes: Vec<String> = Vec::new();
    for li in document.select(&selector) {
        episodes.push(li.text().collect::<Vec<_>>()[1].to_string());
    }
    Ok(episodes)
}

async fn fetch_episodes(url: &str) -> Result<Vec<String>> {
    let mut res = surf::get(url).await?;
    let html: String = res.body_string().await?;
    let document = Html::parse_document(html.as_str());

    match get_episodes_table(&document) {
        Ok(mut episodes) => {
            if episodes.len() == 0 {
                episodes = match get_episodes_li(&document) {
                    Ok(eps) => eps,
                    _ => Vec::new(),
                }
            }
            Ok(episodes)
        },
        _ => Ok(Vec::new()),
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct PersonLink {
    name: String,
    link: String,
}

#[async_std::main]
async fn main() -> Result<()> {
    // let url = "https://expanse.fandom.com/wiki/K._Lopez_(TV)";
    let string_data = fs::read_to_string("./urls/people.json")?;
    let data: Vec<PersonLink> = serde_json::from_str(&string_data)?;
    for person in data {
        let url = format!("{}{}", BASE_URL, person.link);
        let episodes = fetch_episodes(&url).await?;
        println!("{}", person.name);
        println!("{:#?}", episodes);
    }
    // fetch_info(URL).await?;
    Ok(())
}
