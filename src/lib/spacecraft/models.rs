use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::people::models::Person;

#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Spacecraft {
    pub name: String,
    pub uuid: Option<Uuid>,
    pub url: Option<String>,
    pub class: Option<String>,
    #[serde(default)]
    pub owner_navy: Vec<String>,
    #[serde(default)]
    pub crew: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SpacecraftDetail {
    pub name: String,
    pub url: Option<String>,
    pub class: Option<SpacecraftClass>,
    #[serde(default)]
    pub owner: Vec<String>,
    #[serde(default)]
    pub crew: Vec<Person>,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SpacecraftClass {
    // pub uuid: Option<Uuid>,
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
