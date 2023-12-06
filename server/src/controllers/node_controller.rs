use crate::{models::node_mdl::NodeModel, utils::query_utils::ToEdgedbQuery};
use axum::{extract::State, http::StatusCode, Json};
use serde::Deserialize;

#[derive(Default, Clone, Deserialize)]
pub struct AddNewNode {
    name: Option<String>,
    address: String,
    dns: Option<String>,
}

impl ToEdgedbQuery for AddNewNode {
    fn to_query(&self) -> &'static str {
        return "insert Node { name := <str>$0 , dns := <str>$1 , address :=<str>$2 };";
    }
}

// add_new_node: Add new node to the simulated network
pub async fn add_new_node(
    State(edgedb_client): State<edgedb_tokio::Client>,
    Json(payload): Json<AddNewNode>,
) -> Result<Json<NodeModel>, StatusCode> {
    let query = payload.to_query();
    let node_result: NodeModel = edgedb_client
        .query_required_single(
            query,
            &(
                payload.name,
                payload.dns,
                payload.address,
                Vec::<String>::default(),
            ),
        )
        .await
        .unwrap();
    Ok(Json(node_result))
}

#[derive(Default, Clone, Deserialize)]
pub struct AddNodeKeyStore {
    node_id: String,
    pair_pubkey: String,
}

impl ToEdgedbQuery for AddNodeKeyStore {
    fn to_query(&self) -> &'static str {
        return "update Node filter Node.id = <str>$0 set {
            keystore += (
                select Pair filter .public_key = <str>$1
            ) 
        }";
    }
}

pub async fn add_node_keystore(
    State(edgedb_client): State<edgedb_tokio::Client>,
    Json(payload): Json<AddNodeKeyStore>,
) -> Result<Json<NodeModel>, StatusCode> {
    let query = &payload.to_query();
    let node_result: NodeModel = edgedb_client
        .query_required_single(query, &(payload.node_id, payload.pair_pubkey))
        .await
        .unwrap();
    Ok(Json(node_result))
}

#[derive(Default)]
pub struct GetAllNodes {}

impl ToEdgedbQuery for GetAllNodes {
    fn to_query(&self) -> &'static str {
        return "select Node;";
    }
}

pub async fn get_all_nodes(
    State(edgedb_client): State<edgedb_tokio::Client>,
) -> Result<Json<Vec<NodeModel>>, StatusCode> {
    let query = &GetAllNodes::default().to_query();
    match edgedb_client.query(query, &()).await {
        Ok(node_results) => return Ok(Json(node_results)),
        Err(err) => {
            tracing::error!("ERROR [get_all_nodes]: {}", err);
            return Ok(Json(vec![]));
        }
    }
}
