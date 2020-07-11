use std::fs;
use clap::Clap;

#[derive(Clap)]
#[clap(version = "1.0", author = "Keith Bingman. <kbingman@gmail.com>")]
struct Opts {
    /// Some input. Because this isn't an Option<T> it's required to be used
    input: String,
}

fn main() -> tide::Result<()> {
    let opts: Opts = Opts::parse();

    // Gets a value for config if supplied by user, or defaults to "default.conf"
    println!("Using input file: {}", opts.input);
    let string = fs::read_to_string(&opts.input)?;
    // let person_data: Vec<Person> = serde_json::from_str(&string).upwrap();
    println!("{}", string);
    Ok(())
}
