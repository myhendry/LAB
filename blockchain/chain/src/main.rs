mod play;

use play::*;
use blockchainlib::{Block, Hashable};

fn main () {
    // let mut block = Block::new(0, 0, vec![0; 32], 0, "Genesis block!".to_owned(), 0x00ffffffffffffffffffffffffffffff);

    // block.hash = block.hash();
    // println!("B {:?}", &block); // 8563e3eed833b5998594515e26abfd63d6b650492984b1372abd2a5b85d12827 at: 0 with: Genesis block!
    // println!("bh {:?}", block.hash); // 32 digits [133, 99, 227, 238, 216, 51, 181, 153, 133, 148, 81, 94, 38, 171, 253, 99, 214, 182, 80, 73, 41, 132, 177, 55, 42, 189, 42, 91, 133, 209, 40, 39]

    // block.mine();

    // let n = block.nonce;
    // println!("n {:?}", n); // 799
    // println!("B {:?}", &block); // Block[0]: f89242fdc014fba3220051eed1da72d7db396b15b74c7bd08f55caa85ce94900 at: 0 with: Genesis block!

    let a = test();    
    println!("a is {:?}", a);
    

}
