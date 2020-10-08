use super::state::State;
use tide::Request;

pub(crate) fn get_database(req: &Request<State>) -> mongodb::Database {
    req.state().database("theexpanseapi-prod")
}
