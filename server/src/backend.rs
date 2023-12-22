use std::net::{Ipv4Addr, SocketAddr};

use anyhow::Error;
use axum::{
    routing::{get, post},
    Router,
};
use clap::Parser;

use crate::{controllers, state::AppState, Config};

/// start the web server with command
/// CMD: `cargo run --bin substrate-simulator-server -- --port 3000`
pub async fn start_backend() -> Result<(), Error> {
    // initialize tracing
    tracing_subscriber::fmt().init();

    // Parse command line arguments
    let config = Config::parse();

    tracing::info!("Server port configured at {}", config.port);

    let client = edgedb_tokio::create_client().await?;
    let state = AppState {
        edgedb_client: client,
    };
    // build our application with a route
    let app = Router::new()
        .route(
            "/nodes",
            post(controllers::node_controller::add_new_node)
                .get(controllers::node_controller::get_all_nodes),
        )
        .route(
            "/nodes/add_key",
            post(controllers::node_controller::add_node_keystore),
        )
        .route(
            "/keys/generate",
            post(controllers::keypair_controller::generate_new_key_pair),
        )
        .route(
            "/keys/",
            post(controllers::keypair_controller::save_new_keypair),
        )
        .route(
            "/keys/public",
            get(controllers::keypair_controller::read_pair_from_public),
        )
        .route(
            "/chain_spec",
            get(controllers::chain_controller::list_default_chain_specs),
        )
        .with_state(state);

    let addr = SocketAddr::from((Ipv4Addr::UNSPECIFIED, config.port));
    tracing::info!("Listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .expect("Failed to serve the simulator server");

    Ok(())
}
