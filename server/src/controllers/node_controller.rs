use crate::models::node_mdl::NodeModel;
use axum::{http::StatusCode, Json};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct AddNewNode {
    node_name: String,
}

// add_new_node: Add new node to the simulated network
pub async fn add_new_node(Json(payload): Json<AddNewNode>) -> Result<Json<NodeModel>, StatusCode> {
    let node_result = NodeModel::new(payload.node_name);
    Ok(Json(node_result))
}
