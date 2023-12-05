use anyhow::{Error, Result};
use sc_cli::utils::PublicFor;
use sc_cli::CryptoScheme;
use sp_core::hexdisplay::HexDisplay;
use sp_runtime::traits::IdentifyAccount;
use sp_runtime::MultiSigner;

pub fn format_public_key<P: sp_core::Pair>(public_key: PublicFor<P>) -> String {
    format!("0x{}", HexDisplay::from(&public_key.as_ref()))
}

pub fn format_account_id<P: sp_core::Pair>(public_key: PublicFor<P>) -> String
where
    PublicFor<P>: Into<MultiSigner>,
{
    format!(
        "0x{}",
        HexDisplay::from(&public_key.into().into_account().as_ref())
    )
}

pub fn crypto_scheme_from_str(s: &str) -> Result<CryptoScheme> {
    match s {
        "Ed25519" => Ok(CryptoScheme::Ed25519),
        "Ecdsa" => Ok(CryptoScheme::Ecdsa),
        "Sr25519" => Ok(CryptoScheme::Sr25519),
        _ => Err(Error::msg("variant not found")),
    }
}
