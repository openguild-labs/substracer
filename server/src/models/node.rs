use crate::serializer::{serialize_edge_datetime, serialize_optional_edge_datetime};
use chrono::Utc;
use edgedb_derive::Queryable;
use edgedb_protocol::model::Datetime as EDatetime;
use field_names::FieldNames;
use serde::Serialize;
use serde_with::skip_serializing_none;

use crate::types::EdgeSelectable;

use super::keypair::SimulatedPairModel;

#[serde_with::apply(
    EDatetime => #[serde(serialize_with = "serialize_edge_datetime")],
    Option<EDatetime> => #[serde(serialize_with = "serialize_optional_edge_datetime")],
)]
#[skip_serializing_none]
#[derive(Serialize, Debug, Eq, PartialEq, Queryable, FieldNames)]
pub struct NodeModel {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub dns: Option<String>,
    pub address: String,
    pub keystore: Vec<SimulatedPairModel>,
    pub created_at: EDatetime,
    pub updated_at: Option<EDatetime>,

    // address collection of boot nodes
    pub boot_nodes: Vec<String>,
}

impl Default for NodeModel {
    fn default() -> Self {
        let created_at = Utc::now().try_into().unwrap_or(EDatetime::MIN);
        Self {
            id: uuid::Uuid::default(),
            name: None,
            dns: None,
            address: String::default(),
            keystore: Vec::default(),
            created_at,
            updated_at: None,
            boot_nodes: Vec::default(),
        }
    }
}

impl EdgeSelectable for NodeModel {
    fn fields_as_shape() -> String {
        let fields_array: Vec<String> = Self::FIELDS
            .into_iter()
            .map(|s| match s {
                "keystore" => {
                    let keystore_fields = SimulatedPairModel::fields_as_shape();
                    format!("keystore: {keystore_fields}")
                }
                _ => s.to_string(),
            })
            .collect();
        let fields = fields_array.join(", ");
        format!("{{ {fields} }}")
    }
}
