use chrono::{DateTime, Utc};
use chrono_tz::Asia::Ho_Chi_Minh;
use edgedb_protocol::model::Datetime as EDatetime;
use serde::ser::Serializer;
use serde::Serialize;

pub fn serialize_edge_datetime<Se>(edt: &EDatetime, serializer: Se) -> Result<Se::Ok, Se::Error>
where
    Se: Serializer,
{
    let chrono: DateTime<Utc> = edt.into();
    let dt_string = chrono.with_timezone(&Ho_Chi_Minh).format("%+").to_string();
    dt_string.serialize(serializer)
}

pub fn serialize_optional_edge_datetime<Se>(
    edt: &Option<EDatetime>,
    serializer: Se,
) -> Result<Se::Ok, Se::Error>
where
    Se: Serializer,
{
    match edt {
        Some(edt) => serialize_edge_datetime(edt, serializer),
        None => serializer.serialize_none(),
    }
}
