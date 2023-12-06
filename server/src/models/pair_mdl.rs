use anyhow::{Error, Result};
use bip39::{Language, Mnemonic, MnemonicType};
use edgedb_derive::Queryable;
use sc_cli::{utils::format_seed, with_crypto_scheme, CryptoScheme};
use serde::{Deserialize, Serialize};
use sp_core::crypto::{
    unwrap_or_default_ss58_version, ExposeSecret, SecretString, Ss58AddressFormat, Ss58Codec,
};
use sp_runtime::MultiSigner;

use crate::utils::key_utils::{format_account_id, format_public_key};
use sp_runtime::traits::IdentifyAccount;

#[derive(Default, Deserialize, Serialize, Debug, PartialEq, Eq, Queryable)]
pub struct SimulatedPairModel {
    pub id: uuid::Uuid,
    pub key_password: Option<String>,
    pub secret_phrase: Option<String>,
    pub secret_key_uri: Option<String>,
    pub public_key_uri: Option<String>,
    pub secret_seed: Option<String>,
    pub network_id: String,
    pub public_key: String,
    pub account_id: String,
    pub public_key_ss58: String,
    pub ss58_address: String,
}

pub(crate) mod pair_dispatcher {
    use super::*;

    pub fn generate_from_uri<Pair>(
        uri: &str,
        password: Option<SecretString>,
        network_override: Option<Ss58AddressFormat>,
    ) -> Result<SimulatedPairModel>
    where
        Pair: sp_core::Pair,
        Pair::Public: Into<MultiSigner>,
    {
        let password = password
            .as_ref()
            .map(|s| s.expose_secret().as_str().to_string());
        let network_id = String::from(unwrap_or_default_ss58_version(network_override));
        if let Ok((pair, seed)) = Pair::from_phrase(uri, password.as_deref()) {
            let public_key = pair.public();
            let network_override = unwrap_or_default_ss58_version(network_override);
            return Ok(SimulatedPairModel {
                id: uuid::Uuid::default(),
                key_password: password,
                public_key_uri: None,
                account_id: format_account_id::<Pair>(public_key.clone()),
                secret_phrase: Some(uri.to_string()),
                network_id: network_id,
                secret_key_uri: None,
                public_key: format_public_key::<Pair>(public_key.clone()),
                public_key_ss58: public_key.to_ss58check_with_version(network_override),
                secret_seed: Some(format_seed::<Pair>(seed)),
                ss58_address: pair
                    .public()
                    .into()
                    .into_account()
                    .to_ss58check_with_version(network_override),
            });
        } else if let Ok((pair, seed)) = Pair::from_string_with_seed(uri, password.as_deref()) {
            let public_key = pair.public();
            let network_override = unwrap_or_default_ss58_version(network_override);
            return Ok(SimulatedPairModel {
                id: uuid::Uuid::default(),
                key_password: password,
                public_key_uri: None,
                account_id: format_account_id::<Pair>(public_key.clone()),
                secret_phrase: None,
                network_id: network_id,
                secret_key_uri: Some(uri.to_string()),
                public_key: format_public_key::<Pair>(public_key.clone()),
                public_key_ss58: public_key.to_ss58check_with_version(network_override),
                secret_seed: if let Some(seed) = seed {
                    Some(format_seed::<Pair>(seed))
                } else {
                    None
                },
                ss58_address: pair
                    .public()
                    .into()
                    .into_account()
                    .to_ss58check_with_version(network_override),
            });
        } else if let Ok((public_key, network)) = Pair::Public::from_string_with_version(uri) {
            let network_override = network_override.unwrap_or(network);
            return Ok(SimulatedPairModel {
                id: uuid::Uuid::default(),
                key_password: password,
                secret_phrase: None,
                secret_key_uri: None,
                secret_seed: None,
                public_key_uri: Some(uri.to_string()),
                network_id: network_id,
                public_key: format_public_key::<Pair>(public_key.clone()),
                public_key_ss58: public_key.to_ss58check_with_version(network_override),
                account_id: format_account_id::<Pair>(public_key.clone()),
                ss58_address: public_key.to_ss58check_with_version(network_override),
            });
        } else {
            return sc_service::Result::Err(Error::msg("Invalid phrase/URI given"));
        }
    }

    /// Try to parse given `public` as hex encoded public key and print relevant information.
    pub fn get_pair_from_public<Pair>(
        public_str: &str,
        network_override: Option<Ss58AddressFormat>,
    ) -> Result<SimulatedPairModel, Error>
    where
        Pair: sp_core::Pair,
        Pair::Public: Into<MultiSigner>,
    {
        let public = array_bytes::hex2bytes(public_str).unwrap();

        let public_key = Pair::Public::try_from(&public)
            .map_err(|_| "Failed to construct public key from given hex")
            .unwrap();

        let network_override = unwrap_or_default_ss58_version(network_override);

        return Ok(SimulatedPairModel {
            id: uuid::Uuid::default(),
            key_password: None,
            secret_phrase: None,
            secret_key_uri: None,
            secret_seed: None,
            public_key_uri: None,
            network_id: String::from(network_override),
            public_key: format_public_key::<Pair>(public_key.clone()),
            account_id: format_account_id::<Pair>(public_key.clone()),
            public_key_ss58: public_key.to_ss58check_with_version(network_override),
            ss58_address: public_key.to_ss58check_with_version(network_override),
        });
    }

    pub fn get_scheme_pair_from_public(
        public_str: &str,
        scheme: CryptoScheme,
        network_overrides: Option<Ss58AddressFormat>,
    ) -> Result<SimulatedPairModel, Error> {
        with_crypto_scheme!(scheme, get_pair_from_public(public_str, network_overrides))
    }

    pub fn generate_new_scheme_key_pair(
        words: Option<usize>,
        scheme: CryptoScheme,
        network: Option<Ss58AddressFormat>,
        password: Option<SecretString>,
    ) -> Result<SimulatedPairModel, Error> {
        let words = match words {
            Some(words) => MnemonicType::for_word_count(words).map_err(|_| {
                Error::msg("Invalid number of words given for phrase: must be 12/15/18/21/24")
            })?,
            None => MnemonicType::Words12,
        };
        let mnemonic = Mnemonic::new(words, Language::English);
        with_crypto_scheme!(
            scheme,
            generate_from_uri(mnemonic.phrase(), password, network)
        )
    }
}
