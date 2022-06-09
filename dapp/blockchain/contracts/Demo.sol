// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "hardhat/console.sol";

import "@chainlink/contracts/src/v0.7/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

contract Demo {
    string public name = "hendry";
    string public country = "singapore";
    address payable public owner;
    AggregatorV3Interface private s_priceFeed;
    uint256 public constant MINIMUM_USD = 50 * 10**18;

    //* Array and Mapping Funders
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    constructor() {
        owner = payable(msg.sender);
        // Eth to Usd Price Feed Address
        s_priceFeed = AggregatorV3Interface(
            0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
        );
    }

    //* Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner can call this function");
        _;
    }

    //* Fallbacks
    receive() external payable {}

    //* Using ChainLink Price Converter to Convert USD to ETH
    using PriceConverter for uint256;

    //todo
    function exchange() external payable returns (uint256) {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "You need more Eth"
        );
    }

    function testConversion() external view returns (uint256) {
        uint256 amount = PriceConverter.getPrice(s_priceFeed);
        return amount;
    }

    //* Array and Mapping Funders
    function fund() public payable {
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    function checkFund(address funderAddress) public view returns (uint256) {
        return addressToAmountFunded[funderAddress];
    }

    function unfund() public {
        //! reset the mapping
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        //! reset the array
        funders = new address[](0);

        //! withdraw the funds - 3 ways: transfer / send / call
        //! transfer - cap at 2300 gas and revert if fail
        payable(msg.sender).transfer(address(this).balance);

        //! OR send - cap at 2300 gas and returns bool
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send Failed");

        //! OR call - forward all gas or set gas and returns bool (Lower level)
        // (bool sendSuccess, bytes memory dataReturned) = payable(msg.sender)
        //     .call{value: address(this).balance}(""); // ("") because not calling any function
    }

    //* Deposit and Withdraw Eth
    function withdraw(uint256 _amount) external onlyOwner {
        owner.transfer(_amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function setName(string memory _name) external {
        name = _name;
    }

    function getCountry() public view returns (string memory) {
        return country;
    }
}
