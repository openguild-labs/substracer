use std::collections::HashMap;

use anyhow::Result;
use chrono::Utc;
use edgedb_protocol::model::Datetime as EDatetime;
use sc_service::ChainSpec;

use crate::utils::errors::NetworkCoreError;

use super::node::{ParachainId, SimulatedNode};

pub enum NetworkEntityScope {
    RELAY,
    PARA,
    COMPANION,
}

type Parachain = HashMap<ParachainId, Vec<SimulatedNode>>;

// Server configuration
#[derive(Debug)]
pub struct SimluatedNetwork {
    pub chain_spec: Box<dyn ChainSpec>,
    pub namespace: String,
    pub chain_id: Option<String>,
    pub created_at: EDatetime,
    pub relay: Vec<SimulatedNode>,
    pub companions: Vec<SimulatedNode>,
    pub para: Parachain,
}

impl SimluatedNetwork {
    pub fn new(chain_spec: Box<dyn ChainSpec>) -> Self {
        let created_at = Utc::now().try_into().unwrap_or(EDatetime::MIN);
        SimluatedNetwork {
            chain_spec,
            namespace: String::default(),
            chain_id: None,
            created_at,
            companions: vec![],
            relay: vec![],
            para: HashMap::default(),
        }
    }

    pub fn add_new_node(
        self: &mut Self,
        node: SimulatedNode,
        scope: NetworkEntityScope,
    ) -> Result<(), NetworkCoreError> {
        match scope {
            NetworkEntityScope::COMPANION => self.companions.push(node),
            NetworkEntityScope::RELAY => self.relay.push(node),
            NetworkEntityScope::PARA => {
                if node.parachain_id.is_none()
                    || !self.para.contains_key(&node.parachain_id.unwrap())
                {
                    return Err(NetworkCoreError::ObjectNotFound("Parachain".to_string()));
                }
            }
        };
        Ok(())
    }
}
