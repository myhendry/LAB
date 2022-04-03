use std::str::FromStr;

#[derive(Debug)]
pub enum Method {
	GET,
	PUT,
	PATCH,
	DELETE,
}

impl FromStr for Method {
	type Err = MethodError;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
	    match s {
		    "GET" => Ok(Self::GET),
		    "PUT" => Ok(Self::PUT),
		    "PATCH" => Ok(Self::PATCH),
		    "DELETE" => Ok(Self::DELETE),
		    _ => Err(MethodError)
	    }
	}
}

pub struct MethodError;