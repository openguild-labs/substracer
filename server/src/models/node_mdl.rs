use edgedb_derive::Queryable;
use serde::{Deserialize, Serialize};

use super::pair_mdl::SimulatedPairModel;

#[derive(Default, Serialize, Deserialize, Debug, Eq, PartialEq, Queryable)]
pub struct NodeModel {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub dns: Option<String>,
    pub address: String,
    pub keystore: Vec<SimulatedPairModel>,
}
