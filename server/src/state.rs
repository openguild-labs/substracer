use axum::extract::FromRef;
use edgedb_tokio::Client as EdgedbTokioClient;

#[derive(Clone)]
pub struct AppState {
    // that holds some api specific state
    pub edgedb_client: EdgedbTokioClient,
}

impl FromRef<AppState> for EdgedbTokioClient {
    fn from_ref(app_state: &AppState) -> EdgedbTokioClient {
        app_state.edgedb_client.clone()
    }
}
