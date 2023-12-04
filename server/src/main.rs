mod chain_spec;
mod config;

use axum::{
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use chain_spec::local_testnet_config;
use config::ServerConfiguration;
use serde::{Deserialize, Serialize};

// load chain specification
fn load_chain_spec() -> Result<Box<dyn sc_service::ChainSpec>, String> {
    let loaded_spec = local_testnet_config()?;
    Ok(Box::new(loaded_spec))
}

// simulate Substrate network
fn simulate_substrate_net() -> Result<(), String> {
    let _chain_spec = self::load_chain_spec()?;
    ServerConfiguration::new(_chain_spec);
    Ok(())
}

async fn start_web_server() {
    // initialize tracing
    tracing_subscriber::fmt::init();

    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(root))
        // `POST /users` goes to `create_user`
        .route("/users", post(create_user));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

#[tokio::main]
async fn main() {
    println!("Substrate simulator");

    simulate_substrate_net().unwrap();

    start_web_server().await;
}

// basic handler that responds with a static string
async fn root() -> &'static str {
    "Hello, World!"
}

async fn create_user(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(payload): Json<CreateUser>,
) -> (StatusCode, Json<User>) {
    // insert your application logic here
    let user = User {
        id: 1337,
        username: payload.username,
    };

    // this will be converted into a JSON response
    // with a status code of `201 Created`
    (StatusCode::CREATED, Json(user))
}

// the input to our `create_user` handler
#[derive(Deserialize)]
struct CreateUser {
    username: String,
}

// the output to our `create_user` handler
#[derive(Serialize)]
struct User {
    id: u64,
    username: String,
}
