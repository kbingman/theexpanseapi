use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub struct Episode {
    pub uuid: Option<Uuid>,
    pub title: String,
    pub episode: i16,
    pub season: Option<i16>,
    pub description: String,
}
