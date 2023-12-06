use edgedb_derive::Queryable;
use serde::{Deserialize, Serialize};

use super::pair_mdl::SimulatedPairModel;

#[derive(Default, Serialize, Deserialize, Debug, Eq, PartialEq, Queryable)]
pub struct NodeModel {
    pub address: String,
    pub node_name: Option<String>,
    pub dns: Option<String>,
    pub keystore: Vec<SimulatedPairModel>,
}
