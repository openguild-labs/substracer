pub trait ToEdgedbQuery {
    fn to_query(&self) -> String;
}
