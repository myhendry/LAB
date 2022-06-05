#![allow(dead_code)]

pub fn test() -> String  {
	let mut a1 = Ammo::new("Chris".to_string(), 20);
	a1.sing();
	a1.name = "Alvin".to_string();
	a1.name

}

#[derive(Debug)]
pub struct Circle {
	pub index: u32,
	pub hash: Vec<u8>,
	pub data: String,
}

impl Circle {
	pub fn new(index: u32, hash: Vec<u8>, data: &str) -> Self {
		Circle { index, hash, data: data.to_string() }
	}

	pub fn mutate(&mut self) {
		self.data = "Hello".to_string();
		self.hash.push(100);
	}

	pub fn change(&mut self, new_data: &str) -> bool {
		self.data = new_data.to_string();
		return true;
	}

	pub fn print(&self) {
		for v in self.hash.iter() {
			println!("{}", *v);
		}
	}
}

impl Shape for Circle {
	fn manage(&self) -> &str {
	    &*self.data
	}
}

pub trait Shape {
	 fn manage(&self) -> &str;
}

struct Ammo {
	name: String,
	age: u32,
}

impl Ammo {
	fn new(name: String, age: u32) -> Self {
		Ammo { name, age }
	}
}

impl Weapon for Ammo {
	fn sing(&self) {
		println!("My name is {} and age is {}", self.name, self.age);
	}
}

trait Weapon {
	fn sing(&self);
}

