use crate::spacecraft::models::SpacecraftClass;
use mongodb::{
    bson::{from_bson, Bson, Document},
    Database,
};

pub async fn find_spacecraft_class(
    db: &Database,
    filter: Document,
) -> anyhow::Result<Option<SpacecraftClass>> {
    let result = db.collection("classes").find_one(filter, None).await?;
    let class = match result {
        Some(d) => {
            let class: SpacecraftClass = from_bson(Bson::Document(d))?;
            Some(class)
        }
        None => None,
    };
    Ok(class)
}
