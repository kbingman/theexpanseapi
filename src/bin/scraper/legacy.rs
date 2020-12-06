/// Gets the title from a row
fn get_row_title(row: select::node::Node) -> Option<String> {
    match row.find(Name("a")).nth(0) {
        Some(title) => Some(title.text()),
        None => None,
    }
}

/// Gets the row title only if
fn get_appears_in(row: select::node::Node) -> Option<String> {
    match row.find(Name("td")).nth(1) {
        Some(appeared) => {
            if appeared.text() != "Appears" {
                return None;
            }
            get_row_title(row)
        }
        None => None,
    }
}

/// Gets a list of all episodes a given character appears in
fn get_episodes(document: &Document) -> Vec<String> {
    let mut names: Vec<String> = Vec::new();
    for table in document.find(Class("mw-collapsible")) {
        for row in table.find(Name("tr")) {
            match get_appears_in(row) {
                Some(name) => names.push(name),
                None => {}
            }
        }
    }
    names
}

