use regex::Regex;
use std::collections::HashMap;

pub fn get_info(document: &Document) -> Result<HashMap<String, String>> {
    let regex = Regex::new(r"♂|♀|💓")?;
    let mut info: HashMap<String, String> = HashMap::new();
    match document.find(Name("aside")).next() {
        Some(aside) => {
            for data in aside.find(Class("pi-data")) {
                match data.find(Class("pi-data-label")).next() {
                    Some(key) => match data.find(Class("pi-data-value")).next() {
                        Some(value) => {
                            info.insert(
                                key.text().to_lowercase(),
                                regex.replace_all(&value.text().to_string(), "").to_string(),
                            );
                        }
                        None => {}
                    },
                    None => {}
                }
            }
        }
        None => {}
    };
    Ok(info)
}
