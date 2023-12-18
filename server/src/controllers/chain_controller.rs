use std::collections::HashMap;

use crate::{
    chain_spec::{development_config, local_testnet_config, ChainSpec},
    models::chain_spec::ChainSpecModel,
};
use axum::{http::StatusCode, Json};
use serde_json as json;

pub fn load_json_chain_spec(chain_spec_config: ChainSpec) -> ChainSpecModel {
    let local_testnet_config_str = chain_spec_config.as_json(false).unwrap();
    let config_json: ChainSpecModel = json::from_str(&local_testnet_config_str).unwrap();
    return config_json;
}

// query_chain_spec: query a chain specification of the simulated network
pub async fn list_default_chain_specs(
) -> Result<Json<HashMap<&'static str, ChainSpecModel>>, StatusCode> {
    let mut chain_spec_list = HashMap::<&'static str, ChainSpecModel>::default();

    chain_spec_list.insert(
        "local_testnet_config",
        load_json_chain_spec(local_testnet_config().unwrap()),
    );

    chain_spec_list.insert(
        "development_config",
        load_json_chain_spec(development_config().unwrap()),
    );
    Ok(Json(chain_spec_list))
}
