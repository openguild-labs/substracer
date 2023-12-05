use serde::Serialize;

#[derive(Default, Serialize, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct NodeModel {
    node_name: String,
}

impl NodeModel {
    pub fn new(_name: String) -> Self {
        NodeModel { node_name: _name }
    }
}
