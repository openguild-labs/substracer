use serde::{Deserialize, Serialize};

pub struct HasAddress {
    address: String,
}

pub struct NoAddress;

pub struct TypedNodeIdentityBuilder<Address> {
    name: Option<String>,
    dns: Option<String>,
    address: Address,
}

impl Default for TypedNodeIdentityBuilder<NoAddress> {
    fn default() -> Self {
        Self {
            address: NoAddress,
            name: None,
            dns: None,
        }
    }
}

impl<NoAddress> TypedNodeIdentityBuilder<NoAddress> {
    pub fn address(self, addr: String) -> TypedNodeIdentityBuilder<HasAddress> {
        TypedNodeIdentityBuilder {
            address: HasAddress { address: addr },
            dns: self.dns,
            name: self.name,
        }
    }
}

impl TypedNodeIdentityBuilder<HasAddress> {
    pub fn name(self, name: String) -> TypedNodeIdentityBuilder<HasAddress> {
        Self {
            name: Some(name),
            address: self.address,
            dns: self.dns,
        }
    }

    pub fn dns(self, dns: String) -> TypedNodeIdentityBuilder<HasAddress> {
        Self {
            address: self.address,
            dns: Some(dns),
            name: self.name,
        }
    }

    pub fn build(self) -> NodeModel {
        NodeModel {
            address: self.address.address,
            node_name: self.name,
            dns: self.dns,
        }
    }
}

#[derive(Default, Serialize, Deserialize, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct NodeModel {
    address: String,
    node_name: Option<String>,
    dns: Option<String>,
}
