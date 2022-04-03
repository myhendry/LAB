#![allow(unused_variables)]
#![allow(dead_code)]
use std::{convert::From, num::ParseIntError, cell::{Cell, RefCell}, sync::Mutex, collections::HashMap, fmt::Display};


mod server;
use server::*;

mod http;
use http::{Request, Method, StatusCode, Response};

// todo L48


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
    // c1.run();

    // use TimeOfDay::*;

    // let fear = 10.0;
    // let daytime = change_fear(Morning);
    // daytime(fear);

    // println!("{}", fear);

    // let afternoon_time = change_fear(Afternoon);
    // afternoon_time(fear);

    // println!("{}", fear);

    // let n1 = 20;
    // let mut f1 = return_number("double");
    // f1(n1);
    // println!("{}", n1);

    // let mut f2 = return_number("triple");
    // f2(n1);
    // println!("{}", n1);

    // let num1 = 5;

    // let f1 = || {
    //     num1 * 100
    // };

    // let r1 = f1();
    // println!("{}", r1);
    // println!("{}", num1);

    // let ms1 = String::from("hey mate");
    // let r1 =play_string(&ms1);
    // println!("{}", r1);

        let p1 = Phone{
            model: "Nokia".to_string(),
            price: Cell::new(20.),
            sold: Cell::new(false),
        };
        // dbg!(&p1);        
        // p1.sold.set(true);
        // dbg!(&p1);
        // let r1 = p1.sold.get();
        // println!("{}", r1);
        p1.add_promotion();
        p1.toggle_sold();
        // dbg!(&p1);


        let pen1 = Pen{
            name: "pilot".to_string(),
            available: RefCell::new("yes".to_string())
        };

        *pen1.available.borrow_mut() = "no".to_string();
        // dbg!(pen1);

        let m1 = Mule{
            name: Mutex::new("james".to_string()),
            selected: Mutex::new(false),
            number: Mutex::new(0),
        };

        *m1.name.lock().unwrap() = "alvis".to_string();
        *m1.selected.lock().unwrap() = true;
        //println!("{:?}", m1);

        let m2 = Mule{
            name: Mutex::new("eri".to_string()),
            selected: Mutex::new(true),
            number: Mutex::new(0),
        };
        // let mut2changer1 = m2.name.lock();

        if let Ok(mut nn) = m2.name.try_lock() {
            *nn = "iora".to_string();
        };

        for _ in 0..50 {
            *m2.number.lock().unwrap() += 1;            
        };
        // println!("{:?}", m2);

        let rw1 = RW{name: Mutex::new(true), age: Mutex::new(20)};
        
        // let mut title = rw1.name.lock().unwrap();
        //let mut age = rw1.age.lock().unwrap();
        //println!("{:?}", rw1);

        // println!("{:?}", Gender::Male);

        let g1 = Gender::Female;

        match g1 {
            Gender::Male => {
                // println!("{}", "Male Only");
            },
            Gender::Female => {
                // println!("{}", "Female Only");
            }
        }    
        
        let s1 = String::from("tim");
        let s2 = &s1;
        // println!("{:?}", s2);
        let s3 = &s1[3..];
        // println!("{:?}", s3);
        let s4 = "1234"; // baked into the binary

        let rr1 = Request{
            path: "name",
            query_string: Some("test2"),
            method: Method::GET,
        };
        // println!("{:?}", rr1);
        if let Some(x) = rr1.query_string {
            // println!("x is {}", x);
        }

        let a1 = [1, 2, 3];
        // println!("{:?}", a1);
        let mut av1 = vec![1, 3, 30];
        av1.push(1000);
        // println!("{:?}", av1);

        let server = Server::new("127.0.0.1:8000");
        // server.run();

        let x = op_func("John");
        
        if let Some(y) = x {
            // println!("{}", y);
        }

        let xx1 = x.unwrap();
        // println!("{}", xx1); 

        // match x {
        //     Some(y) => println!("{}", y),
        //     None => println!("None")
        // }

        let vvv1 = vec![String::from("Andie"), String::from("James"), String::from("Keith")];
        // for item in &vvv1 {
        //     println!("{}", item);
        // }
        // println!("{:?}", vvv1);
        
        let res1: Vec<_>=vv1.iter().map(|x| x + 10).collect();
        // println!("{:?}", res1);

        // let res2: Vec<_> = vvv1.iter().enumerate().map(|(x, y)| {
        //     println!("{}", x);
        //     println!("{}", y);
        //     format!("hello {}", *y)
        // }).collect();
        // println!("{:?}", res2);
        
        // for v in &vvv1 {
        //     println!("{}", v);
        // }

        let mut hmm1 = HashMap::new();

        for v in &vvv1 {
            hmm1.insert(v, 1000);            
        }

        // println!("{:?}", hmm1[&"Keith".to_string()]);
        // println!("{:?}", hmm1.get(&"Keith".to_string()));
        // println!("{:?}", vvv1);

        // if let Some(x) = hmm1.get(&"Keith".to_string()) {
        //     println!("{}", x);
        // }
        
        // let mut letters = HashMap::new();

        // for ch in "this is a long story".chars() {
        //     let counter = letters.entry(ch).or_insert(0);
        //     *counter += 1;
        //     println!("{} {}", ch, counter);
        // }

        // let sw1 = "a=1&b=2&c&d=&e===&d=7&d=abc";
        // for sub_str in sw1.split('&') {
        //     println!("{}", sub_str);
        // }

        // let sc1 = StatusCode::NotFound;
        // //println!("{}", sc1.reason_phrase());
        // //println!("{}", sc1);

        // let rs1 = Response::new(sc1, Some("Ka".to_string()));

        // let mut aa1 = Alien::new("Alvin", 26, vec![Skill::Read, Skill::Talk]);
        // println!("{:?}", aa1);

        // aa1.add_new_skills(Skill::Sing);
        // println!("{:?}", aa1);

        // let ra1 = aa1.skills.get(1);
        // if let Some(r) = ra1 {
        //     println!("{}", r);
        //     println!("{}", r.reason_phrase());
        // };

        
    }

#[derive(Debug, Clone, Copy)]
pub enum Skill {
    Read = 100,
    Talk = 200,
    Sing = 300,
}

impl Skill {
    fn reason_phrase(&self) -> &str {
        match self {
            Self::Read => "read",
            Self::Talk => "talk",
            Self::Sing => "sing",
        }
    }
}

impl Display for Skill {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", *self as u16)
    }
}

#[derive(Debug)]
struct Alien<'a> {
    name: &'a str,
    age: u32,
    skills: Vec<Skill>,
}

impl<'a> Alien<'a> {
    pub fn new(name: &'a str, age: u32, skills: Vec<Skill>) -> Self {
        Self {
            name, 
            age,
            skills,
        }
    }
}

impl<'a> Alien<'a> {
    pub fn add_new_skills(&mut self, skill: Skill) {
        self.skills.push(skill)
    }
}


fn op_func(name: &str) -> Option<&str> {
    match name {
        "John" => Some("J"),
        "Keith" => Some("K"),
        _ => None,
    }
}

#[derive(Debug)]
struct RW {
    name: Mutex<bool>,
    age: Mutex<u32>,
}

#[derive(Debug)]
struct Mule {
    name: Mutex<String>,
    selected: Mutex<bool>,
    number: Mutex<u32>,
}

#[derive(Debug)]
struct Pen {
    name: String,
    available: RefCell<String>
}

#[derive(Debug)]
struct Phone {
    model: String,
    price: Cell<f32>,
    sold: Cell<bool>
}

trait Sales {
    fn add_promotion(&self) -> f32;
}

impl Sales for Phone {
    fn add_promotion(&self) -> f32 {
        let p1 = self.price.get() * 0.8;
        self.price.set(p1);
        self.price.get()
    }
}


impl Phone {
    fn toggle_sold(&self) -> bool {
        let r1 = self.sold.get();
        self.sold.set(!r1);
        self.sold.get()
    }
}

fn play_string(s: &str) -> String {
    format!("you are {}", s)
}

enum TimeOfDay {
    Morning,
    Afternoon,
    Night
}

fn return_number(input: &str) -> impl FnMut(i32) -> i32 {
    match input {
        "double" => |mut number| {
            number *= 2;
            println!("Your double number is {:?}", number);
            number
        },
        "triple" => |mut number| {
            number *= 3;
            println!("Your triple number is {:?}", number);
            number
        },
        _ => |number| {
            println!("All else number is {:?}", number);
            number
        }
    }
}

fn change_fear(input: TimeOfDay) -> impl Fn(f64) -> f64 {
    use TimeOfDay::*;

    match input {
        Morning => |x| {
            println!("Morning fear is {}", x*0.5);
            x*0.5
        },
        _ => |x| {
            println!("All else fear is {}", x/0.5);
            x/0.5
        }
    }
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