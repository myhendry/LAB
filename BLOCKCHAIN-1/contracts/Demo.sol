// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";

contract Demo {
    string public name = "Yess";
    // dynamic array
    uint256[] public nums = [1, 2, 3];

    // uint[3] p

    constructor() {
        name = "Hello Demo";
    }
}
