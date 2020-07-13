mod routes;

use std::env;
use dotenv::dotenv;
use lib::state::State;

#[async_std::main]
async fn main() -> tide::Result<()> {
    femme::start(log::LevelFilter::Debug)?;
    dotenv()?;

    let db_uri = env::var("MONGODB_URI")?;
    let state = State::new(&db_uri).await?;
    let mut app = tide::with_state(state);

    app.at("/people").get(routes::list_people);
    app.at("/people/:uuid").get(routes::find_people);
    app.at("/spacecraft").get(routes::list_spacecraft);
    app.at("/spacecraft/:uuid").get(routes::find_spacecraft);
    // app.at("/:db/list").get(routes::list_colls);
    // app.at("/:db/:collection").post(routes::insert_doc);
    // app.at("/:db/:collection").get(routes::find_doc);
    // app.at("/:db/:collection/update").get(routes::update_doc);
    app.listen("localhost:8080").await?;

    Ok(())
}
