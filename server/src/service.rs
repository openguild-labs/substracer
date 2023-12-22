use crate::{
    backend,
    chain_spec::local_testnet_config,
    models::{network::SimluatedNetwork, node::SimulatedNode},
};

pub fn print_node_infos(network: &SimluatedNetwork, node: &SimulatedNode) {
    println!("📋 Chain specification: {}", network.chain_spec.name());
    println!("🏷  Node name: {:?}", node.name());
    println!("👤 Role: {:?}", node.role);
}

// load chain specification
pub fn load_chain_spec() -> Result<Box<dyn sc_service::ChainSpec>, String> {
    let loaded_spec = local_testnet_config()?;
    Ok(Box::new(loaded_spec))
}

pub fn init_simulated_net() -> Result<SimluatedNetwork, String> {
    let _chain_spec = self::load_chain_spec()?;
    let network = SimluatedNetwork::new(_chain_spec);
    Ok(network)
}

pub async fn run_service() {
    backend::start_backend().await.unwrap();
}
