use thiserror::Error;

#[derive(Debug, Error)]
pub enum ServerApiError {
    #[error(transparent)]
    JsonExtractionError(#[from] serde_json::Error),
    #[error(transparent)]
    EdgeDBQueryError(#[from] edgedb_errors::Error),
    #[error("{0} not found")]
    ObjectNotFound(String),
    #[error("Not enough data")]
    NotEnoughData,
    #[error(transparent)]
    ValidationErrors(#[from] validify::ValidationErrors),
    #[error("Other error: {0}")]
    Other(String),
}
