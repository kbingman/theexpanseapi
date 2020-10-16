use super::state::State;
use tide::Request;

use tide::http::mime;
use tide::{Response, StatusCode};

/// Error handling for all routes
pub async fn error_handler(res: Response) -> tide::Result {
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

pub(crate) fn get_database(req: &Request<State>) -> mongodb::Database {
    req.state().database("theexpanseapi-prod")
}

/// Formats a UUID into a path
/// TODO add a base URL
pub fn format_url<T: std::fmt::Display>(label: &str, uuid: &Option<T>) -> Option<String> {
    match uuid {
        Some(id) => Some(format!("/{}/{}", &label, &id)),
        None => None,
    }
}
