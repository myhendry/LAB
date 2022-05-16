pub fn test() -> String  {
	let mut a1 = Ammo::new("Chris".to_string(), 20);
	a1.sing();
	a1.name = "Alvin".to_string();
	a1.name

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