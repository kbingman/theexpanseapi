use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::people::models::Person;

#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Spacecraft {
    pub name: String,
    pub uuid: Uuid,
    pub class: Option<String>,
    #[serde(default)]
    pub owner: Vec<String>,
    #[serde(default)]
    pub crew: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SpacecraftDetail {
    pub name: String,
    pub url: Option<String>,
    pub owner: Vec<String>,
    #[serde(default)]
    pub class: Option<SpacecraftClass>,
    #[serde(default)]
    pub class_id: Option<String>,
    #[serde(default)]
    pub crew: Vec<Person>,
    #[serde(default)]
    pub crew_ids: Vec<String>,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SpacecraftClass {
    pub uuid: Option<Uuid>,
    pub name: String,
    #[serde(default)]
    #[serde(alias = "owner")]
    pub owner_navy: Vec<String>,
    #[serde(default)]
    pub propulsion: Vec<String>,
    #[serde(default)]
    pub armament: Vec<String>,
    #[serde(default)]
    pub complement: Vec<String>,
    #[serde(default)]
    pub crew: Vec<String>,
    pub length: Option<String>,
    pub width: Option<String>,
    pub weight: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Included {
    pub class: Option<SpacecraftClass>,
    pub crew: Vec<Person>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Related {
    pub __type: String,
    pub uuid: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Relationships {
    pub class: Option<Related>,
    pub crew: Vec<Related>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Attr {
    pub name: String,
    pub owner: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Response {
    pub data: Spacecraft,
    pub included: Included,
}
