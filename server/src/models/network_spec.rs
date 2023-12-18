use sc_service::ChainSpec;

use super::network_node::NetworkNode;

// Server configuration
#[derive(Debug)]
pub struct NetworkSpecModel {
    pub chain_spec: Box<dyn ChainSpec>,
    pub nodes: Vec<NetworkNode>,
}

impl NetworkSpecModel {
    pub fn new(chain_spec: Box<dyn ChainSpec>) -> Self {
        NetworkSpecModel {
            chain_spec,
            nodes: vec![],
        }
    }

    pub fn get_chain_spec(self: Self) -> Box<dyn ChainSpec> {
        self.chain_spec
    }
}
