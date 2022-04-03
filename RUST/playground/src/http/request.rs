use std::{convert::TryFrom, str::{from_utf8, Utf8Error}, error::Error, fmt::{Display, Debug}};

use super::{Method, MethodError};

#[derive(Debug)]
pub struct Request<'a> {
	pub path: &'a str,
	pub query_string: Option<&'a str>,
	pub method: Method,
}

impl<'a> TryFrom<&'a [u8]> for Request<'a> {
	type Error = ParseError;

	fn try_from(buf: &'a [u8]) -> Result<Self, Self::Error> {
		let request = from_utf8(buf)?;				
		
		let (method, request) = get_next_word(request).ok_or(ParseError::InvalidRequest)?;
		let (mut path, request) = get_next_word(request).ok_or(ParseError::InvalidRequest)?;
		let (protocol, _) = get_next_word(request).ok_or(ParseError::InvalidRequest)?;

		if protocol != "HTTP/1.1" {
			return Err(ParseError::InvalidProtocol)
		}

		// ! convert &str method to type Method
		let method: Method = method.parse()?; 

		let mut query_string = None;

		if let Some(i) = path.find('?') {
			// query_string = Some(&path[i+1..]);
			query_string = Some(&path[i+1..]);
			path = &path[..i];
		}

		Ok(Self {
				path, 
				query_string, 
				method
		})
	}
}

fn get_next_word(request: &str) -> Option<(&str, &str)> {
	for (i, c) in request.chars().enumerate() {
		if c == ' ' || c == '\r' {
			return Some((&request[..i], &request[i+1..]));
		}
	}
	None
}

#[derive(Debug)]
pub enum ParseError {
	InvalidRequest,
	InvalidEncoding,
	InvalidProtocol,
	InvalidMethod,
}

impl ParseError {
	pub fn message(&self) -> &str {
		match self {
			Self::InvalidRequest => "Invalid Request",
			Self::InvalidEncoding => "Invalid Encoding",
			Self::InvalidMethod => "Invalid Method",
			Self::InvalidProtocol => "Invalid Protocol",
		}
	}
}

impl Error for ParseError {}

impl Display for ParseError {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
	    write!(f, "{}", self.message())
	}
}

// impl Debug for ParseError {
// 	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
// 	    write!(f, "{}", self.message())
// 	}
// }

impl From<Utf8Error> for ParseError {
	fn from(_: Utf8Error) -> Self {
		Self::InvalidEncoding
	}
}

impl From<MethodError> for ParseError {
	fn from(_: MethodError) -> Self {
	    Self::InvalidMethod
	}
}