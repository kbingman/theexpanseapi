use tide::Request;
use super::state::State;

pub(crate) fn get_database(req: &Request<State>) -> mongodb::Database {
    req.state().database("theexpanseapi-prod")
}
