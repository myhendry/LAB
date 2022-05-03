// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";

// [ ] Enum
// [ ] Looping through Array
// [ ] Inheritance

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
    // Struct
    struct Car {
        string model;
        uint256 age;
    }
    Car[] public cars;
    uint256 public carsCount;
    // Enum
    enum Status {
        Active,
        Inactive
    }
    struct Member {
        string name;
        Status status;
    }
    Member[] public members;
    uint256 public membersCount;

    constructor() {
        name = "Hello Demo";
        nums.push(9);
    }

    function setName(string memory _name) external {
        name = _name;
    }

    function addMember(string memory _name) external {
        Member memory member = Member(_name, Status.Active);
        members.push(member);
        membersCount++;
    }

    // Updating Mappings and Structs
    function setMemberInactive(uint256 index) external {
        Member storage member = members[index];
        member.name = "Jeremy";
        member.status = Status.Inactive;
    }

    function getCarsCount() external view returns (uint256) {
        return carsCount;
    }

    function getCaller() external view returns (address) {
        return msg.sender;
    }

    // Structs and Array
    function addCar(string memory _model, uint256 _age) external {
        Car memory car = Car(_model, _age);
        //Car memory car2 = Car({model: _model, age: _age});
        cars.push(car);
        carsCount++;
    }

    function getCar(uint256 index) external view returns (Car memory) {
        return cars[index];
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

    function pureFunc() external pure returns (uint256) {
        return 3 + 10;
    }

    function globalVariables()
        external
        view
        returns (
            address,
            uint256,
            uint256
        )
    {
        address sender = msg.sender;
        console.log("sender", sender);
        uint256 timestamp = block.timestamp;
        console.log("timestamp", timestamp);
        uint256 blockNum = block.number;
        console.log("blockNum", blockNum);
        return (sender, timestamp, blockNum);
    }

    modifier numConstraint(uint256 _num) {
        require(_num < 10, "Number cannot exceed 10");
        _;
    }

    function modFunc(uint256 _num)
        external
        pure
        numConstraint(_num)
        returns (uint256)
    {
        return _num + 500;
    }

    function changeArr(uint256 _num) external {
        nums.push(_num);
    }

    function returnArray() external view returns (uint256[] memory) {
        return nums;
    }

    function addBalance(uint256 _amt) external {
        balances[msg.sender] += _amt;
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
}
