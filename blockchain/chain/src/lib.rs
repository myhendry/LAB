type BlockHash = Vec<u8>;

// Credit: https://stackoverflow.com/a/44378174/2773837
use std::time::{ SystemTime, UNIX_EPOCH };

pub fn now () -> u128 {
    let duration = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
    ;

    duration.as_secs() as u128 * 1000 + duration.subsec_millis() as u128
}

/*
https://users.rust-lang.org/t/code-explanation/25697/2
It splits a 32-bit integer into four bytes.
0x2 is 2 in hex and 0x3 is 3 in hex and 0x1 is 1 in hex so on so forth
Given a 32-bit integer u, it shifts the bits right by 0 bits, then 8 bits, 
then 16 bits, then 24 bits. It then takes each of those and casts to an
8-bit integer, truncating as needed
*/
pub fn u32_bytes (u: &u32) -> [u8; 4] {
    [
        (u >> 8 * 0x0) as u8,
        (u >> 8 * 0x1) as u8,
        (u >> 8 * 0x2) as u8,
        (u >> 8 * 0x3) as u8,
    ]
}
// same as u32_bytes above
pub fn u32_bytes_le(u: u32) -> [u8; 4] {
    [(u >>  0) as u8,
     (u >>  8) as u8,
     (u >> 16) as u8,
     (u >> 24) as u8]
}

pub fn u64_bytes (u: &u64) -> [u8; 8] {
    [
        (u >> 8 * 0x0) as u8,
        (u >> 8 * 0x1) as u8,
        (u >> 8 * 0x2) as u8,
        (u >> 8 * 0x3) as u8,

        (u >> 8 * 0x4) as u8,
        (u >> 8 * 0x5) as u8,
        (u >> 8 * 0x6) as u8,
        (u >> 8 * 0x7) as u8,
    ]
}

pub fn u128_bytes (u: &u128) -> [u8; 16] {
    [
        (u >> 8 * 0x0) as u8,
        (u >> 8 * 0x1) as u8,
        (u >> 8 * 0x2) as u8,
        (u >> 8 * 0x3) as u8,

        (u >> 8 * 0x4) as u8,
        (u >> 8 * 0x5) as u8,
        (u >> 8 * 0x6) as u8,
        (u >> 8 * 0x7) as u8,

        (u >> 8 * 0x8) as u8,
        (u >> 8 * 0x9) as u8,
        (u >> 8 * 0xa) as u8,
        (u >> 8 * 0xb) as u8,

        (u >> 8 * 0xc) as u8,
        (u >> 8 * 0xd) as u8,
        (u >> 8 * 0xe) as u8,
        (u >> 8 * 0xf) as u8,
    ]
}

pub fn difficulty_bytes_as_u128 (v: &Vec<u8>) -> u128 {
    ((v[31] as u128) << 0xf * 8) |
    ((v[30] as u128) << 0xe * 8) |
    ((v[29] as u128) << 0xd * 8) |
    ((v[28] as u128) << 0xc * 8) |
    ((v[27] as u128) << 0xb * 8) |
    ((v[26] as u128) << 0xa * 8) |
    ((v[25] as u128) << 0x9 * 8) |
    ((v[24] as u128) << 0x8 * 8) |
    ((v[23] as u128) << 0x7 * 8) |
    ((v[22] as u128) << 0x6 * 8) |
    ((v[21] as u128) << 0x5 * 8) |
    ((v[20] as u128) << 0x4 * 8) |
    ((v[19] as u128) << 0x3 * 8) |
    ((v[18] as u128) << 0x2 * 8) |
    ((v[17] as u128) << 0x1 * 8) |
    ((v[16] as u128) << 0x0 * 8)
}

mod block;
pub use crate::block::Block;

mod hashable;
pub use crate::hashable::Hashable;