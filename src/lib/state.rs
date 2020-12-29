//! Shared application state.

#[derive(Clone, Debug)]
pub struct State {
    pub client: mongodb::Client,
}

impl State {
    /// Create a new instance of `State`.
    pub async fn new(uri: &str) -> tide::Result<Self> {
        let client = mongodb::Client::with_uri_str(uri).await?;
        Ok(Self { client })
    }

    // /// Access the mongodb client.
    // pub(crate) fn mongo(&self) -> &mongodb::Client {
    //     &self.client
    // }

    /// Access the DB
    pub fn database(&self, name: &str) -> mongodb::Database {
        self.client.database(name)
    }
}
