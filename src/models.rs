use uuid::Uuid;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Spacecraft {
    pub name: String,
    pub uuid: Option<Uuid>,
    pub class: Option<String>,
    #[serde(default)]
    pub owner_navy: Vec<String>,
    #[serde(default)]
    pub crew: Vec<String>,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SpacecraftClass {
    pub uuid: Option<Uuid>,
    pub name: String,
    #[serde(default)]
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
pub struct Person {
    pub name: String,
    pub uuid: Option<Uuid>,
    pub alias: Option<String>,
    pub status: Option<String>,
    pub gender: Option<String>,
    pub occupation: Option<String>,
}
