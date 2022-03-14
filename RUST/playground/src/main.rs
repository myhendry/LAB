#![allow(unused_variables)]
#![allow(dead_code)]
use std::{convert::From, num::ParseIntError};

// !
// ?                // On Result
// .unwrap()        // On Result & Option
// .expect("error message")

// ! VECTORS
// vec![1, 2, 3, 4, 6, 7];
// vec![6; 100];
// (0..10).collect::Vec<<i32>>();

// ! ITERS
// for in
// while

// .iter().map() / .into_iter().map() / .iter_mut().for_each()

// ! CLOSURES
// .iter().map(|x| println!("{}", x));
// .map()
// .filter()
// .filter_map()    // Returns Option<Item>
// .zip()
// .char_indices()  // On Strings
// .chars() 
// .ok()            // Turns Result -> Option
// .ok_or()         // Turns Option -> Result
// .ok_or_else(||)  // Turns Option -> Result
// .and_then()      // Turns Option -> Option
// .and()
// .all()
// .any()
// .find()
// .sum()
// .rev()
// .cycle()         // Works well with .zip()
// .take() 
// .skip() 
// .fold() 
// .take_while()
// .skip_while()
// .map_while()
// .cloned()
// .by_ref()
// .chunks()
// .windows()
// .match_indices()
// .peekable()

// ! PRINT
// println!("{}", );
// println!("{:?}", );
// dbg!();
// .inspect(|x| println!("{}", x));

fn main() {

    
    let s1 = Student::new("John", 22);
    let s2 = Student::new("Darren", 26);
    let s5 = Student::new("Allen", 28);
    let s6 = Student::new("Ray", 26);
    
    let c1 = Class::from(vec![&s1, &s2, &s5, &s6]);
    // dbg!(c1);

    let vvv1 = vec![1, 3, 10, 100, 200];
    let x1 = vvv1.get(2);

    // for x in (0..8) {
    //     println!("{:?}", &vvv1.get(x).unwrap_or(&000));
    // }



    
    // let r1 = c1.students.iter().any(|x| x.age > 29);
    let r1 = c1.students.iter().all(|x| x.age < 30);
    // println!("{}", r1);

    let first_try = vec![Some("success!"), None, Some("success!"), Some("success!"), None];
    let second_try = vec![None, Some("success!"), Some("success!"), Some("success!"), Some("success!")];
    let third_try = vec![Some("success!"), Some("success!"), Some("success!"), Some("success!"), None];

    // for i in 0..first_try.len() {
    //     println!("{:?}", first_try[i].and(second_try[i]).and(third_try[i]));
    // }

    let vv1 = (1..10).collect::<Vec<i32>>();

    let r1 = vv1.iter().find(|&x| *x == 5);
    
    let r2 = vv1.get(1);

    let r3 = parse_str("h");
  
    



    // let mut s3 = Student::new("Alvin", 25);
    // let mut s4 = Student::new("Chris",  27);

    // let mut g1 = Group::from(vec![&mut s3, &mut s4]);
    // println!("{:?}", g1);

    // for g in g1.students.iter_mut() {
    //     g.age = 80;
    // }
    // println!("{:?}", g1);
    // println!("{:?}", s3);
    // println!("{:?}", s4);

    // let mut s5 = Student::new("Irene", 30);
    // s5.name = "Alexia".to_string();
    // println!("{:?}", s5);
    // println!("{:?}", s5);

    // let l1 = Library{books: vec!["Soccernet".to_string(), "Liverpool".to_string()]};
    // println!("{:?}", l1);
    // for item in l1.clone() {
    //     println!("{}", item);
    // }

    let h1 = Human{name: "Mm".to_string(), age: 20};
    // h1.roar();

    let a1 = Animal{nickname: "Aa".to_string(), age: 12};
    // a1.roar();
    
    let c1 = Characters{
        components: vec![Box::new(h1), Box::new(a1)],
    };
    c1.run();
}

// !Trait Objects -- Start
struct Characters {
    components: Vec<Box<dyn Monster>>,
}

impl Characters {
    fn run(&self) {
        for component in self.components.iter() {
            component.roar();
        }
    }
}

trait Monster {
    fn roar(&self) {
        println!("Hello Roar");
    }
}

#[derive(Debug)]
 struct Human {
     name: String,
     age: u32,
}

impl Monster for Human {
    fn roar(&self) {
        println!("Roaring {}", self.name);
    }
}

#[derive(Debug)]
 struct Animal {
     nickname: String,
     age: u32,
}

impl Monster for Animal {
    fn roar(&self) {
        println!("{}", self.nickname);
    }
}
// !Trait Objects -- End

fn parse_str(input: &str) -> Result<i32, ParseIntError> {
    let parsed_number = input.parse::<i32>()?; // Here is the question mark
    Ok(parsed_number)
}

#[derive(Debug)]
struct Student {
    name: String,
    age: u32
}

impl Student {
    fn new(name: &str, age: u32) -> Self {
        Self {
            name: name.to_string(),
            age,
        }
    }
}

#[derive(Debug)]
struct Class<'a> {
    students: Vec<&'a Student>,
}

impl<'a> From<Vec<&'a Student>> for Class<'a> {
    fn from(students: Vec<&'a Student>) -> Self {
        Self {
            students
        }
    }
}

impl<'a> Class<'a> {
    fn print_students(&self) {
        for student in &self.students {
            println!("{:?}", student);
        }
    }
}

// ! Trait From -- Start
#[derive(Debug)]
struct Group<'a> {
    students: Vec<&'a mut Student>,
}

impl<'a> From<Vec<&'a mut Student>> for Group<'a> {
    fn from(students: Vec<&'a mut Student>) -> Self {
        Self {
            students
        }
    }

}
// ! Trait From -- End

// ! Trait Iterator -- Start
#[derive(Debug, Clone)]
struct Library {
    books: Vec<String>
}

impl Iterator for Library {
    type Item = String;
    
    fn next(&mut self) -> Option<Self::Item> {
        match self.books.pop() {
            Some(book) => Some(book + "is found"),
            None => None,
        }
    }
}
// ! Trait Iterator -- End