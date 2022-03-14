// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";

contract Demo {
    string public name = "Yess";
    // dynamic array
    uint256[] public nums = [1, 2, 3];
    // fixed array
    uint256[3] public nums_fixed = [1, 2, 3];
    // mapping
    mapping(address => uint256) public savings;
    // iterable Mapping
    mapping(address => uint256) public balances;
    mapping(address => bool) public inserted;
    address[] public keys;

    constructor() {
        name = "Hello Demo";
        nums.push(9);
    }

    // Console.log
    function transfer(string memory _name) public view returns (string memory) {
        console.log("name", _name);
        return _name;
    }

    // Update Value in Array
    function change(uint256 _num) external {
        nums[1] = _num;
    }

    // Get Array
    function getArr() external view returns (uint256[] memory) {
        return nums;
    }

    // Method 1: Remove Element: Remove with Last Value and Pop
    function remove(uint256 _index) external {
        nums[_index] = nums[nums.length - 1];
        nums.pop();
    }

    // Remove Value in Array
    // Value at _index will be set to 0
    function removeValue(uint256 _index) external {
        delete nums[_index];
    }

    // Mapping Set Balance
    function setSavings(uint256 _amt) external {
        savings[msg.sender] += _amt;
    }

    // Mapping Get Balance
    function getSavings() external view returns (uint256) {
        return savings[msg.sender];
    }

    // Iterable Mapping: Start
    function setBalance(address _key, uint256 _val) external {
        balances[_key] = _val;

        if (!inserted[_key]) {
            inserted[_key] = true;
            keys.push(_key);
        }
    }

    function getSize() external view returns (uint256) {
        return keys.length;
    }

    function first() external view returns (uint256) {
        return balances[keys[0]];
    }

    function last() external view returns (uint256) {
        return balances[keys[keys.length - 1]];
    }

    function get(uint256 _i) external view returns (uint256) {
        return balances[keys[_i]];
    }
    // Iterable Mapping: End
}
