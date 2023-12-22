use std::{
    net::{Ipv4Addr, SocketAddrV4},
    str::FromStr,
};

use crate::{
    serializer::{serialize_edge_datetime, serialize_optional_edge_datetime},
    utils::errors::NetworkCoreError,
};
use chrono::Utc;
use edgedb_derive::Queryable;
use edgedb_protocol::model::Datetime as EDatetime;
use field_names::FieldNames;
use sc_network::PeerId;
use serde::Serialize;
use serde_with::skip_serializing_none;

use crate::types::EdgeSelectable;

use super::keypair::SimulatedKeypair;

pub type ParachainId = i64;
pub type NetworkPort = u16;

#[derive(Debug, Clone, Queryable, Serialize, Eq, PartialEq)]
pub enum SimulatedNodeRole {
    Temp,
    Node,
    BootNode,
    Collator,
    CumulusCollator,
}

#[derive(Default, Clone, Debug, Queryable, Serialize, Eq, PartialEq)]
pub struct SimulatedNetworkConfig {
    pub ws_uri: Option<String>,
    pub prometheus_uri: Option<String>,

    // Queryable and Serialize macro only support i64
    pub ws_port: Option<i64>,
    pub rpc_port: Option<i64>,

    pub boot_nodes: Vec<String>,

    pub ip_address: String,
}

impl SimulatedNetworkConfig {
    pub fn ip(self: &mut Self, ip_address: String) -> &mut Self {
        self.ip_address = ip_address;
        self
    }

    pub fn ws_port(self: &mut Self, port: NetworkPort) -> &mut Self {
        self.ws_port = Some(port as i64);
        self
    }

    pub fn rpc_port(self: &mut Self, port: NetworkPort) -> &mut Self {
        self.rpc_port = Some(port as i64);
        self
    }
}

#[serde_with::apply(
    EDatetime => #[serde(serialize_with = "serialize_edge_datetime")],
    Option<EDatetime> => #[serde(serialize_with = "serialize_optional_edge_datetime")],
)]
#[skip_serializing_none]
#[derive(Clone, Serialize, Debug, Eq, PartialEq, Queryable, FieldNames)]
pub struct SimulatedNode {
    pub id: String,
    pub name: Option<String>,
    pub keystore: Vec<SimulatedKeypair>,
    // pointer to the assigned parachain
    pub parachain_id: Option<i64>,

    pub created_at: EDatetime,
    pub updated_at: Option<EDatetime>,

    // address collection of boot nodes
    pub role: SimulatedNodeRole,

    pub network_config: SimulatedNetworkConfig,
}

impl Default for SimulatedNode {
    fn default() -> Self {
        let created_at = Utc::now().try_into().unwrap_or(EDatetime::MIN);
        let peer_id = PeerId::random().to_base58();
        Self {
            id: peer_id,
            name: None,
            keystore: Vec::default(),
            created_at,
            updated_at: None,
            parachain_id: None,
            role: SimulatedNodeRole::Node,
            network_config: SimulatedNetworkConfig::default(),
        }
    }
}

impl SimulatedNode {
    pub fn add_name(self: &mut Self, name: Option<String>) -> &mut Self {
        self.name = name;
        self
    }

    pub fn add_network(self: &mut Self, config: SimulatedNetworkConfig) -> &mut Self {
        self.network_config = config;
        self
    }

    pub fn name(self: &Self) -> &str {
        match &self.name {
            Some(val) => val.as_str(),
            None => "Unknown",
        }
    }

    pub fn port(self: &Self) -> (Option<i64>, Option<i64>) {
        (self.network_config.ws_port, self.network_config.rpc_port)
    }

    /// Return the SocketAddrV4 struct from the provided ip address
    pub fn socket(self: &Self) -> Result<SocketAddrV4, NetworkCoreError> {
        let ip_address = Ipv4Addr::from_str(self.network_config.ip_address.as_str())
            .map_err(NetworkCoreError::InvalidIpFormatError)
            .unwrap();
        let (ws_port, _) = self.port();
        match ws_port {
            Some(value) => Ok(SocketAddrV4::new(ip_address, value as u16)),
            None => Err(NetworkCoreError::ObjectNotFound(String::from("ws_port"))),
        }
    }
}

impl EdgeSelectable for SimulatedNode {
    fn fields_as_shape() -> String {
        let fields_array: Vec<String> = Self::FIELDS
            .into_iter()
            .map(|s| match s {
                "keystore" => {
                    let keystore_fields = SimulatedKeypair::fields_as_shape();
                    format!("keystore: {keystore_fields}")
                }
                _ => s.to_string(),
            })
            .collect();
        let fields = fields_array.join(", ");
        format!("{{ {fields} }}")
    }
}
