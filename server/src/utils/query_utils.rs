pub trait ToEdgedbQuery {
    fn to_query(&self) -> &'static str;
}
