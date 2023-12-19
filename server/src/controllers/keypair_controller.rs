use crate::{
    models::keypair::{pair_dispatcher, SimulatedKeypair},
    utils::{key_utils::crypto_scheme_from_str, query_utils::ToEdgedbQuery},
};
use axum::{extract::State, http::StatusCode, Json};
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
) -> Result<Json<SimulatedKeypair>, StatusCode> {
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

    let new_pair = pair_dispatcher::generate_new_scheme_key_pair(
        payload.words,
        scheme,
        get_network(),
        Some(SecretString::new(get_password())),
    )
    .unwrap();

    Ok(Json(new_pair))
}

#[derive(Default, Deserialize)]
pub struct SaveNewKeypair {
    keypair: SimulatedKeypair,
}

impl ToEdgedbQuery for SaveNewKeypair {
    fn to_query(&self) -> String {
        return String::from(
            "INSERT Pair {
            key_password := <str>$0,
            secret_phrase := <str>$1,
            secret_key_uri := <str>$2,
            public_key_uri := <str>$3,
            secret_seed := <str>$4,

            network_id := <str>$5,
            public_key := <str>$6,
            account_id := <str>$7,
            public_key_ss58 := <str>$8,
            ss58_address := <str>$9
        }",
        );
    }
}

pub async fn save_new_keypair(
    State(edgedb_client): State<edgedb_tokio::Client>,
    Json(payload): Json<SaveNewKeypair>,
) -> Result<Json<SimulatedKeypair>, StatusCode> {
    let query = payload.to_query();
    let keypair = payload.keypair;
    let pair_result: SimulatedKeypair = edgedb_client
        .query_required_single(
            query.as_str(),
            &(
                keypair.key_password,
                keypair.secret_phrase,
                keypair.secret_key_uri,
                keypair.public_key_uri,
                keypair.secret_seed,
                keypair.network_id,
                keypair.public_key,
                keypair.account_id,
                keypair.public_key_ss58,
                keypair.ss58_address,
            ),
        )
        .await
        .unwrap();
    Ok(Json(pair_result))
}

#[derive(Deserialize)]
pub struct ReadPairFromPublic {
    publickey: String,
    scheme: String,
    network_overrides: Option<String>,
}

pub async fn read_pair_from_public(
    Json(payload): Json<ReadPairFromPublic>,
) -> Result<Json<SimulatedKeypair>, StatusCode> {
    let get_network = || {
        if let Some(_network) = payload.network_overrides {
            match parse_ss58_address_format(&_network) {
                Ok(val) => return Some(val),
                Err(_) => return None,
            }
        };
        return None;
    };
    let scheme = crypto_scheme_from_str(payload.scheme.as_str()).unwrap();
    let public_pair =
        pair_dispatcher::get_scheme_pair_from_public(&payload.publickey, scheme, get_network())
            .unwrap();

    Ok(Json(public_pair))
}
