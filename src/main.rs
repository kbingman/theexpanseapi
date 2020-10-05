mod people;
mod spacecraft;
mod state;
mod util;

use std::env;
// use std::io::ErrorKind;
use dotenv::dotenv;
use state::State;
use tide::utils::After;
use tide::http::mime;
use tide::{Response, StatusCode};

/// Error handling for all routes
async fn error_handler (res: Response) -> tide::Result<>{
    // let response: tide::Response;
    let response = match res.error() {
        // Handles errors
        Some(err) => Response::builder(res.status())
              .content_type(mime::JSON)
              .body(format!("{{ \"message\": \"{}\" }}", err.to_string()))
              .build(),
        None => {
            // If no error is reported but something went wrong, this is handled here
            match res.status() {
               StatusCode::NotFound => Response::builder(404)
                    .content_type(mime::JSON)
                    .body("{ \"message\": \"NOT_FOUND_HTML_PAGE\" }")
                    .build(),

                StatusCode::InternalServerError => Response::builder(500)
                    .content_type(mime::JSON)
                    .body("{ \"message\": \"INTERNAL_SERVER_ERROR_HTML_PAGE\" }")
                    .build(),

                _ => res,
            }
        },
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
    app.at("/people/:uuid").get(people::routes::show);

    // Spacecraft routes
    app.at("/spacecraft").get(spacecraft::routes::list);
    app.at("/spacecraft/:uuid").get(spacecraft::routes::show);

    app.listen(format!("localhost:{}", port)).await?;

    Ok(())
}
