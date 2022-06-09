// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "./Demo.sol";
import "hardhat/console.sol";

//*    Test call other contract function
contract CallDemo {
    function setName(Demo _demo, string memory _name) external {
        _demo.setName(_name);
    }

    function getName(Demo _demo) external view returns (string memory) {
        return _demo.getName();
    }
}
