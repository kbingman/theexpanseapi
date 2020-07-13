use uuid::Uuid;
use serde::{Deserialize, Serialize};

pub trait HasUUID {
    fn get_uuid(&self) -> Option<&Uuid>;
    fn get_name(&self) -> &String;
    fn set_uuid(self, uuid: Uuid) -> Uuid;
}

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

impl HasUUID for Spacecraft {
    fn get_name(&self) -> &String {
        &self.name
    }
    fn get_uuid(&self) -> Option<&Uuid> {
        self.uuid.as_ref()
    }
    fn set_uuid(mut self, uuid: Uuid) -> Uuid  {
        self.uuid = Some(uuid);
        uuid
    }
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

impl HasUUID for SpacecraftClass {
    fn get_name(&self) -> &String {
        &self.name
    }
    fn get_uuid(&self) -> Option<&Uuid> {
        self.uuid.as_ref()
    }
    fn set_uuid(mut self, uuid: Uuid) -> Uuid  {
        self.uuid = Some(uuid.to_owned());
        uuid
    }
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

impl HasUUID for Person {
    fn get_name(&self) -> &String {
        &self.name
    }
    fn get_uuid(&self) -> Option<&Uuid> {
        self.uuid.as_ref()
    }
    fn set_uuid(mut self, uuid: Uuid) -> Uuid  {
        self.uuid = Some(uuid);
        uuid
    }
}
