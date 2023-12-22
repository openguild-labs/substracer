use thiserror::Error;

#[derive(Debug, Error)]
pub enum ServerApiError {
    #[error(transparent)]
    JsonExtractionError(#[from] serde_json::Error),

    #[error(transparent)]
    EdgeDBQueryError(#[from] edgedb_errors::Error),

    #[error("{0} not found")]
    ObjectNotFound(String),

    #[allow(unused)]
    #[error("Not enough data")]
    NotEnoughData,

    #[error(transparent)]
    ValidationErrors(#[from] validify::ValidationErrors),

    #[allow(unused)]
    #[error("Other error: {0}")]
    Other(String),
}

#[derive(Debug, Error)]
pub enum NetworkCoreError {
    #[error("{0} not found")]
    ObjectNotFound(String),

    #[error(transparent)]
    InvalidIpFormatError(#[from] std::net::AddrParseError),

    #[error("{0} not foudn")]
    InvalidIpCustomError(String),
}
