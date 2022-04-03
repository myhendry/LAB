use std::net::TcpListener;
use std::io::Read;
use std::convert::TryFrom;

use crate::http::Request;

#[derive(Debug)]
pub struct Server<'a> {
	pub addr: &'a str
}

impl<'a> Server<'a> {
	pub fn new(addr: &'a str) -> Self {
		Self {
			addr 
		}
	}

	pub fn run(self) {
		println!("Listening on {}", &self.addr);
		let listener = TcpListener::bind(&self.addr).unwrap(); 


		loop {
			let mut buffer = [0; 1024];

			match listener.accept() {
				Ok((mut stream, _)) => {
					match stream.read(&mut buffer) {
						Ok(_) => {
							println!("Received a request: {}", String::from_utf8_lossy(&buffer));
							Request::try_from(&buffer[..]);
							todo!()
						},
						Err(e) => println!("Failed to read from connection: {}", e),
					}

				},
				Err(e) => println!("Failed to establish a connection {}", e),
			}

			
		}		
	}
}

#[derive(Debug)]
pub enum Gender {
	Male,
	Female
}