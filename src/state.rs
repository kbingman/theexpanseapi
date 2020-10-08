//! Shared application state.

#[derive(Clone, Debug)]
pub(crate) struct State {
    pub client: mongodb::Client,
}

impl State {
    /// Create a new instance of `State`.
    pub(crate) async fn new(uri: &str) -> tide::Result<Self> {
        let mongo = mongodb::Client::with_uri_str(uri).await?;
        Ok(Self { client: mongo })
    }

    // /// Access the mongodb client.
    // pub(crate) fn mongo(&self) -> &mongodb::Client {
    //     &self.client
    // }

    /// Access the DB
    pub(crate) fn database(&self, name: &str) -> mongodb::Database {
        self.client.database(name)
    }
}
