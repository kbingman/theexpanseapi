use anyhow::Result;
use async_std::prelude::*;
use mongodb::{
    bson::{from_bson, to_bson, Bson, Document},
    options::{FindOneOptions, FindOptions, UpdateOptions},
    Collection,
};

use serde::de::DeserializeOwned;

pub async fn find_all<T: DeserializeOwned>(
    collection: Collection,
    filter: impl Into<Option<Document>>,
    find_options: impl Into<Option<FindOptions>>,
) -> Result<Vec<T>> {
    let mut cursor = collection.find(filter, find_options).await?;
    let mut results = Vec::<T>::new();

    while let Some(result) = cursor.next().await {
        let document: T = from_bson(Bson::Document(result?))?;
        results.push(document);
    }
    Ok(results)
}

pub async fn find_one<T: DeserializeOwned>(
    collection: &Collection,
    filter: impl Into<Option<Document>>,
    find_options: impl Into<Option<FindOneOptions>>,
) -> Result<Option<T>> {
    let result = collection.find_one(filter, find_options).await?;
    let model = match result {
        Some(d) => {
            let class: T = from_bson(Bson::Document(d))?;
            Some(class)
        }
        None => None,
    };
    Ok(model)
}

pub async fn update_one<T: serde::ser::Serialize>(
    collection: Collection,
    data: T,
    filter: Document,
    update_options: impl Into<Option<UpdateOptions>>,
) -> Result<Option<T>> {
    // let document = to_bson(&data)?;
    if let Bson::Document(document) = to_bson(&data)? {
        // TODO Check mongodb result
        let _result = collection
            .update_one(filter, document, update_options)
            .await?;
        Ok(Some(data))
    } else {
        Ok(None)
    }
}
