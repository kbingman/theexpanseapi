use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub(crate) struct Message<'a> {
    message: &'a str,
    code: &'a str,
}

pub(crate) fn not_found() -> Message<'static> {
    Message {
        message: "Document not found",
        code: "Not Found",
    }
}

pub(crate) fn internal_error() -> Message<'static> {
    Message {
        message: "Something went wrong",
        code: "Internal Error",
    }
}
