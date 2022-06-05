mod play;

// use play::*;
// use blockchainlib::{Block, Hashable};
use play::*;

// * Blockchain in Rust
// https://youtu.be/PZGlYa-6U5U
// ! time cargo run
fn main () {
   
    // * Blockchain Tutorials
    /* 
    let mut block = Block::new(0, 0, vec![0; 32], 0, "Genesis block!".to_owned(), 0x00ffffffffffffffffffffffffffffff);
    println!("new B {:?}", &block);

    block.hash = block.hash();
    println!("Hashed B {:?}", &block); // 8563e3eed833b5998594515e26abfd63d6b650492984b1372abd2a5b85d12827 at: 0 with: Genesis block!
    println!("B hash {:?}", block.hash); // 32 digits [133, 99, 227, 238, 216, 51, 181, 153, 133, 148, 81, 94, 38, 171, 253, 99, 214, 182, 80, 73, 41, 132, 177, 55, 42, 189, 42, 91, 133, 209, 40, 39]

    block.mine();
    println!("Mined B {:?}", &block); // Block[0]: f89242fdc014fba3220051eed1da72d7db396b15b74c7bd08f55caa85ce94900 at: 0 with: Genesis block!
    let n = block.nonce;
    println!("B nonce {:?}", n); // 799
    */

    // * Play 
    let mut c1 = Circle::new(10, vec![1, 2, 3], "yeah");
    println!("{:?}", c1);
    
    c1.mutate();
    println!("{:?}", c1);

    c1.change("fun");
    println!("{:?}", c1);

    let mut c2 = Circle::new(20, vec![10, 20, 30], "circle 2");
    println!("{:?}", c2);

    c2.change("now now");
    println!("{:?}", c2);

    c1.print();

    let r1 = c1.manage();
    println!("{:?}", r1);


}
