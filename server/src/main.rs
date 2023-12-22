mod backend;
mod chain_spec;
mod constant;
mod controllers;
mod models;
mod serializer;
mod service;
mod state;
mod types;
mod utils;

use clap::Parser;
use service::run_service;

/// Simple key/value store with an HTTP API
#[derive(Debug, Parser)]
struct Config {
    /// The port to listen on
    #[clap(short = 'p', long, default_value = "3000")]
    port: u16,
}

#[tokio::main]
async fn main() {
    // start web server for client api
    run_service().await;
}

#[cfg(test)]
mod tests {
    use crate::{
        constant::DEFAULT_LOCALHOST_ADDRESS,
        models::{
            network::NetworkEntityScope,
            node::{SimulatedNetworkConfig, SimulatedNode},
        },
        service::{init_simulated_net, print_node_infos},
    };

    #[test]
    fn test_simulated_network_init() {
        let mut network = init_simulated_net().unwrap();

        let mut node = SimulatedNode::default();
        node.add_name(Some("alice".to_string())).add_network(
            SimulatedNetworkConfig::default()
                .ip(DEFAULT_LOCALHOST_ADDRESS.to_string())
                .ws_port(8000)
                .clone(),
        );

        print_node_infos(&network, &node);

        assert_eq!(
            node.socket().unwrap().ip().to_string(),
            DEFAULT_LOCALHOST_ADDRESS
        );
        assert_eq!(network.relay.len(), 0);

        network
            .add_new_node(node.clone(), NetworkEntityScope::RELAY)
            .unwrap();

        assert!(network.relay.iter().any(|n| n.id == node.id))
    }
}
