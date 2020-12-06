use anyhow::Result;
use mongodb::{bson::doc, Database};

use crate::db::{find_all, find_one};
use crate::util::format_url;

use super::models::{Spacecraft, SpacecraftDetail};

pub async fn find_spacecraft_detail(
    db: &Database,
    spacecraft: Spacecraft,
) -> Result<SpacecraftDetail> {
    let people_collection = db.collection("people");
    let detail = SpacecraftDetail {
        name: spacecraft.name,
        owner: spacecraft.owner_navy,
        url: format_url("spacecraft", &spacecraft.uuid),
        class: match &spacecraft.class {
            Some(id) => find_one(&db.collection("classes"), doc! { "uuid": &id }, None).await?,
            None => None,
        },
        crew: find_all(
            people_collection,
            doc! { "uuid": { "$in": &spacecraft.crew } },
            None,
        )
        .await?,
    };
    Ok(detail)
}

pub fn format_spacecraft(spacecraft: Vec<Spacecraft>) -> Vec<Spacecraft> {
    spacecraft
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
        .collect::<Vec<Spacecraft>>()
}
