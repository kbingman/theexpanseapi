use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub enum Status {
    Alive,
    Deceased,
    Unknown,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum Gender {
    Male,
    Female,
    NonBinary,
    Unspecified,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Person {
    pub name: String,
    pub uuid: Option<Uuid>,
    pub alias: Option<String>,
    pub status: Option<Status>,
    pub gender: Option<Gender>,
    pub occupation: Option<String>,
    pub first_appearance: Option<String>,
    pub last_appearance: Option<String>,
}
