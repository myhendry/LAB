use std::collections::HashMap;


pub fn run_two() {

	let mut p1 = Player::new("Chris");
	p1.change_name("Jerry");
	let r1 = p1.slide();
	p1.get_map();
}

#[derive(Debug)]
pub struct Player<'a> {
	pub name: &'a str,
	pub toys: Vec<&'a str>,
	pub store: HashMap<&'a str, u32>,
}

trait Tackle {
	fn slide(&self) -> bool;
}

impl<'a> Tackle for Player<'a> {
	fn slide(&self) -> bool {
	    if self.toys.len() >= 3 {
		return true
	    }
		false
	}
}

impl<'a> Player<'a> {
	fn new(name: &'a str) -> Self {
		let mut s1 = HashMap::new();
		s1.insert("a1", 100);
		s1.insert("a2", 60);
		Self { name, toys: vec!["soccer", "tennis", "badminton"], store: s1 }
	}

	fn call(self) -> String {
		self.name.to_string()
	}

	fn list(self) {
		for x in self.toys {
			println!("{}", x);
		}
	}

	fn change_name(&mut self, name: &'a str) {
		self.name = name
	}

	fn get_map(&self) {
		for (k, v) in self.store.iter() {
			println!("{} {}", k, v);
		}
	}
}
