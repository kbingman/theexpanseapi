use alcoholic_jwt::{token_kid, validate, JWKS, Validation};

pub async fn fetch_jwks(uri: &str) -> surf::Result<JWKS> {
    let jwt: JWKS = surf::get(uri).recv_json().await?;
    Ok(jwt)
}

pub async fn validate_token(token: &str) -> surf::Result<bool> {
    let authority = std::env::var("AUTHORITY").expect("AUTHORITY must be set");
    let jwks = fetch_jwks(&format!("{}{}", authority.as_str(), ".well-known/jwks.json")).await?;
    let validations = vec![Validation::Issuer(authority), Validation::SubjectPresent];
    let kid = match token_kid(&token) {
        Ok(res) => res.expect("failed to decode kid"),
        Err(_) => "".to_string(),
    };
    let jwk = jwks.find(&kid).expect("Specified key not found in set");
    let res = validate(token, jwk, validations);
    Ok(res.is_ok())
}

