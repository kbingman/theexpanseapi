//! Shared application state.

#[derive(Debug)]
pub struct State {
    pub db: mongodb::Client,
}

impl State {
    /// Create a new instance of `State`.
    pub async fn new(uri: &str) -> tide::Result<Self> {
        let mongo = mongodb::Client::with_uri_str(uri).await?;
        Ok(Self { db: mongo })
    }

    /// Access the mongodb client.
    pub fn mongo(&self) -> &mongodb::Client {
        &self.db
    }
}
