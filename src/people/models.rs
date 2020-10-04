use uuid::Uuid;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Person {
    pub name: String,
    pub uuid: Option<Uuid>,
    pub alias: Option<String>,
    pub status: Option<String>,
    pub gender: Option<String>,
    pub occupation: Option<String>,
}
