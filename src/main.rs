mod messages;
mod people;
mod spacecraft;
mod state;
mod util;

use std::env;
// use std::io::ErrorKind;
use dotenv::dotenv;
use state::State;
use tide::http::mime;
use tide::utils::After;
use tide::{Response, StatusCode};

/// Error handling for all routes
async fn error_handler(res: Response) -> tide::Result {
    // let response: tide::Response;
    let response = match res.error() {
        // Handles errors
        Some(err) => Response::builder(res.status())
            .content_type(mime::JSON)
            .body(format!(
                "{{ \"message\": \"{}\", \"code\": {} }}",
                err.to_string(),
                res.status()
            ))
            .build(),
        None => {
            // If no error is reported but something went wrong, this is handled here
            match res.status() {
                StatusCode::NotFound => Response::builder(404)
                    .content_type(mime::JSON)
                    .body("{ \"message\": \"Not Found\", \"code\": 404 }")
                    .build(),

                StatusCode::InternalServerError => Response::builder(500)
                    .content_type(mime::JSON)
                    .body("{ \"message\": \"Internal Server Error\", \"code\": 500 }")
                    .build(),

                _ => res,
            }
        }
    };

    Ok(response)
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
