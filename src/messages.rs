use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub(crate) struct Message<'a> {
    message: &'a str,
    code: u32,
}

pub(crate) fn not_found() -> Message<'static> {
    Message {
        message: "Document not found",
        code: 404,
    }
}

pub(crate) fn internal_error() -> Message<'static> {
    Message {
        message: "Something went wrong",
        code: 500,
    }
}

