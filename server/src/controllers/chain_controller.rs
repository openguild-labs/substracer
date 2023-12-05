use std::collections::HashMap;

use crate::chain_spec::local_testnet_config;
use axum::{http::StatusCode, response::IntoResponse, Json};

// query_chain_spec: query a chain specification of the simulated network
pub async fn list_default_chain_specs() -> Result<impl IntoResponse, StatusCode> {
    let mut chain_spec_list = HashMap::<&'static str, String>::default();
    let local_testnet_config_str = local_testnet_config().unwrap().as_json(true).unwrap();
    chain_spec_list.insert("local_testnet_config", local_testnet_config_str);
    Ok(Json(chain_spec_list))
}
