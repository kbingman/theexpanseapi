mod state;
mod people;
mod spacecraft;

use std::env;
use std::io::ErrorKind;
use dotenv::dotenv;
use state::State;
use tide::utils::After;
use tide::{StatusCode, Response};

/// Error handling for all routes
async fn error_handler (mut res: Response) -> tide::Result<>{
    if let Some(err) = res.downcast_error::<async_std::io::Error>() {
        if let ErrorKind::NotFound = err.kind() {
            let msg = err.to_string();
            // TODO get this to return the correct error code
            res.set_status(StatusCode::InternalServerError);

            // NOTE: You may want to avoid sending error messages in a production server.
            res.set_body(format!("Error: {}", msg));
        }
    }
    Ok(res)
}

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
    app.at("/people/:uuid").get(people::routes::show);

    // Spacecraft routes
    app.at("/spacecraft").get(spacecraft::routes::list);
    app.at("/spacecraft/:uuid").get(spacecraft::routes::show);

    app.listen(format!("localhost:{}", port)).await?;

    Ok(())
}
