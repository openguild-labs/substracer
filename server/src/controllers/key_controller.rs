use crate::{
    models::pair_mdl::{pair_dispatcher, SimulatedPairModel},
    utils::key_utils::crypto_scheme_from_str,
};
use axum::{http::StatusCode, Json};
use sc_cli::parse_ss58_address_format;
use serde::Deserialize;
use sp_core::crypto::SecretString;

#[derive(Deserialize)]
pub struct GenerateNewKeyPair {
    words: Option<usize>,
    scheme: String,
    network: Option<String>,
    password: Option<String>,
}

// add_new_node: Add new node to the simulated network
pub async fn generate_new_key_pair(
    Json(payload): Json<GenerateNewKeyPair>,
) -> Result<Json<SimulatedPairModel>, StatusCode> {
    let get_network = || {
        if let Some(_network) = payload.network {
            match parse_ss58_address_format(&_network) {
                Ok(val) => return Some(val),
                Err(_) => return None,
            }
        };
        return None;
    };

    let get_password = || {
        if let Some(_password) = payload.password {
            return _password;
        }
        return String::default();
    };

    let scheme = crypto_scheme_from_str(payload.scheme.as_str()).unwrap();

    let new_pair = pair_dispatcher::generate_new_key_pair(
        payload.words,
        scheme,
        get_network(),
        Some(SecretString::new(get_password())),
    )
    .unwrap();

    Ok(Json(new_pair))
}
