mod routes;
mod state;
mod models;

use std::env;
use dotenv::dotenv;
use state::State;

#[async_std::main]
async fn main() -> tide::Result<()> {
    femme::start(log::LevelFilter::Info)?;
    dotenv()?;

    let db_uri = env::var("MONGODB_URI")?;
    let state = State::new(&db_uri).await?;
    let mut app = tide::with_state(state);

    app.at("/people")
      .get(routes::people::list)
      .post(routes::people::create);
    app.at("/people/:uuid").get(routes::people::show);

    app.at("/spacecraft").get(routes::spacecraft::list);
    app.at("/spacecraft/:uuid").get(routes::spacecraft::show);

    app.listen("127.0.0.1:8080").await?;

    Ok(())
}
