use dotenv::dotenv;
use std::env;
use tide::utils::After;

use lib::state::State;
use lib::util::error_handler;
use lib::{people, spacecraft};

#[async_std::main]
async fn main() -> tide::Result<()> {
    // femme::start(log::LevelFilter::Info)?;
    tide::log::start();
    dotenv()?;

    let port = env::var("PORT")?;
    let db_uri = env::var("MONGODB_URI")?;
    let state = State::new(&db_uri).await?;
    let mut app = tide::with_state(state);

    // Middeware
    app.with(After(error_handler));

    // People routes
    app.at("/people")
        .get(people::routes::list)
        .post(people::routes::create);
    app.at("/people/:uuid")
        .get(people::routes::show)
        .put(people::routes::update)
        .delete(people::routes::remove);

    // Spacecraft routes
    app.at("/spacecraft")
        .get(spacecraft::routes::list)
        .post(spacecraft::routes::create);
    app.at("/spacecraft/:uuid")
        .get(spacecraft::routes::show)
        .put(spacecraft::routes::update)
        .delete(spacecraft::routes::remove);

    app.listen(format!("localhost:{}", port)).await?;

    Ok(())
}
