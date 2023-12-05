mod chain_spec;
mod config;
mod controllers;
mod models;

use std::net::{Ipv4Addr, SocketAddr};

use axum::{
    routing::{get, post},
    Router,
};
use chain_spec::local_testnet_config;
use clap::Parser;
use config::ServerConfiguration;

/// Simple key/value store with an HTTP API
#[derive(Debug, Parser)]
struct Config {
    /// The port to listen on
    #[clap(short = 'p', long, default_value = "3000")]
    port: u16,
}

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

/// start the web server with command
/// CMD: `cargo run --bin substrate-simulator-server -- --port 3000`
async fn start_web_server() {
    // initialize tracing
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::TRACE)
        .init();

    // Parse command line arguments
    let config = Config::parse();

    tracing::info!("Server port configured at {}", config.port);

    // build our application with a route
    let app = Router::new()
        .route("/node", post(controllers::node_controller::add_new_node))
        .route(
            "/chain_spec",
            get(controllers::chain_controller::list_default_chain_specs),
        );

    let addr = SocketAddr::from((Ipv4Addr::UNSPECIFIED, config.port));
    tracing::info!("Listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .expect("Failed to serve the simulator server");
}

#[tokio::main]
async fn main() {
    simulate_substrate_net().unwrap();

    start_web_server().await;
}
