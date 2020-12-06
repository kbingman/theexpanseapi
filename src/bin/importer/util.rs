use anyhow::Result;
use mongodb::{
    bson::{to_bson, Bson, Document},
    options::UpdateOptions,
    results::UpdateResult,
    Collection,
};
use uuid::Uuid;

/// Find UUID
pub fn find_uuid(result: Option<Document>) -> Result<String> {
    let uuid = match result {
        Some(document) => match document.get("uuid") {
            Some(id) => match id.as_str() {
                Some(i) => i.to_string(),
                None => Uuid::new_v4().to_string(),
            },
            None => Uuid::new_v4().to_string(),
        },
        None => Uuid::new_v4().to_string(),
    };
    Ok(uuid)
}

/// Find UUID
pub async fn update_model<T: serde::ser::Serialize>(
    collection: &Collection,
    filter: mongodb::bson::Document,
    model: &T,
) -> Result<Option<UpdateResult>> {
    let options = UpdateOptions::builder().upsert(true).build();

    let document = to_bson(&model)?;
    if let Bson::Document(bson_doc) = document {
        let result = collection.update_one(filter, bson_doc, options).await?;
        Ok(Some(result))
    } else {
        println!("Error updating {:#?}", filter);
        Ok(None)
    }
}
