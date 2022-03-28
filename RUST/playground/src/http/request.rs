use std::convert::TryFrom;

#[derive(Debug)]
pub struct Request<'a> {
	pub path: &'a str,
	pub query_string: Option<&'a str>,
	pub method: Method,
}

impl<'a> TryFrom<&[u8]> for Request<'a> {
	type Error = String;

	fn try_from(value: &[u8]) -> Result<Self, Self::Error> {
		todo!();
		
	}
}

#[derive(Debug)]
pub enum Method {
	GET,
	POST,
	PUT, 
	HEAD,
	CONNECT,
	OPTIONS,
	TRACE,
	PATCH,
}