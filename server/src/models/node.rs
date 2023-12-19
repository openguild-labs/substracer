use crate::serializer::{serialize_edge_datetime, serialize_optional_edge_datetime};
use chrono::Utc;
use edgedb_derive::Queryable;
use edgedb_protocol::model::Datetime as EDatetime;
use field_names::FieldNames;
use serde::Serialize;
use serde_with::skip_serializing_none;

use crate::types::EdgeSelectable;

use super::keypair::SimulatedKeypair;

pub type ParachainId = i64;

#[derive(Debug, Clone, Queryable, Serialize, Eq, PartialEq)]
pub enum SimulatedNodeRole {
    Temp,
    Node,
    BootNode,
    Collator,
    CumulusCollator,
}

#[derive(Default, Clone, Debug, Queryable, Serialize, Eq, PartialEq)]
pub struct NodeNetworkConfig {
    pub ws_uri: Option<String>,
    pub prometheus_uri: Option<String>,

    pub ws_port: Option<i64>,
    pub rpc_port: Option<i64>,
    pub p2p_port: Option<i64>,

    pub host_url: String,
}

#[serde_with::apply(
    EDatetime => #[serde(serialize_with = "serialize_edge_datetime")],
    Option<EDatetime> => #[serde(serialize_with = "serialize_optional_edge_datetime")],
)]
#[skip_serializing_none]
#[derive(Clone, Serialize, Debug, Eq, PartialEq, Queryable, FieldNames)]
pub struct Node {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub keystore: Vec<SimulatedKeypair>,
    // pointer to the assigned parachain
    pub parachain_id: Option<i64>,

    pub created_at: EDatetime,
    pub updated_at: Option<EDatetime>,

    // address collection of boot nodes
    pub boot_nodes: Vec<String>,
    pub role: SimulatedNodeRole,

    pub network_config: NodeNetworkConfig,
}

impl Default for Node {
    fn default() -> Self {
        let created_at = Utc::now().try_into().unwrap_or(EDatetime::MIN);
        Self {
            id: uuid::Uuid::default(),
            name: None,
            keystore: Vec::default(),
            created_at,
            updated_at: None,
            boot_nodes: Vec::default(),
            parachain_id: None,
            role: SimulatedNodeRole::Node,
            network_config: NodeNetworkConfig::default(),
        }
    }
}

impl Node {
    pub fn new(name: Option<String>, host_url: String) -> Self {
        let mut base = Node::default();

        base.name = name;
        base.network_config.host_url = host_url;

        base
    }
}

impl EdgeSelectable for Node {
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
