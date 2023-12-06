use edgedb_derive::Queryable;
use serde::{Deserialize, Serialize};
use simulator_runtime::config::RuntimeGenesisConfig;

#[derive(Deserialize, Serialize)]
pub struct GenesisSourceModel {
    runtime: RuntimeGenesisConfig,
}

#[derive(Queryable)]
#[allow(non_snake_case)]
pub struct QueryableChainSpecModel {
    pub id: String,
    pub name: String,
    pub chainType: String,
    pub bootNodes: Vec<String>,
    pub protocolId: Option<String>,
}

#[derive(Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct ChainSpecModel {
    pub id: String,
    pub name: String,
    pub chainType: String,
    pub bootNodes: Vec<String>,
    pub protocolId: Option<String>,
    pub genesis: GenesisSourceModel,
}
