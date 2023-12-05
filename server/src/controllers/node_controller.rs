use crate::models::node_mdl::{NodeModel, TypedNodeIdentityBuilder};
use axum::{http::StatusCode, Json};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct AddNewNode {
    address: String,
    node_name: Option<String>,
    dns: Option<String>,
}

// add_new_node: Add new node to the simulated network
pub async fn add_new_node(Json(payload): Json<AddNewNode>) -> Result<Json<NodeModel>, StatusCode> {
    let mut node_builder = TypedNodeIdentityBuilder::default().address(payload.address);
    if payload.node_name != None {
        node_builder = node_builder.name(payload.node_name.unwrap());
    }

    if payload.dns != None {
        node_builder = node_builder.dns(payload.dns.unwrap());
    }

    let node_result = node_builder.build();
    Ok(Json(node_result))
}
