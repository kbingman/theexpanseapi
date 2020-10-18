use dotenv::dotenv;
use http_types::headers::HeaderValue;
use std::env;
use tide::security::{CorsMiddleware, Origin};
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

    // CORS settings
    let cors = CorsMiddleware::new()
        .allow_methods("GET, POST, PUT, DELETE, OPTIONS".parse::<HeaderValue>()?)
        .allow_origin(Origin::from("*"))
        .allow_credentials(false);

    // Middeware
    app.with(cors);
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

    app.at("/classes")
        .get(spacecraft::routes::list_spacecraft_classes);

    app.listen(format!("localhost:{}", port)).await?;

    Ok(())
}
