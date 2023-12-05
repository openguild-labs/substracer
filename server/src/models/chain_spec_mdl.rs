use serde::{Deserialize, Serialize};
use simulator_runtime::config::RuntimeGenesisConfig;

#[derive(Deserialize, Serialize)]
pub struct GenesisSourceModel {
    runtime: RuntimeGenesisConfig,
}

#[derive(Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct ChainSpecModel {
    name: String,
    id: String,
    chainType: String,
    bootNodes: Vec<String>,
    protocolId: Option<String>,
    genesis: GenesisSourceModel,
}
