// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "hardhat/console.sol";

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
// import "./PriceConverter.sol";

// contract Converter {
//     AggregatorV3Interface private s_priceFeed;
//     address payable public owner;
//     uint256 public constant MINIMUM_USD = 50 * 10**18;

//     constructor() {
//         owner = payable(msg.sender);
//         // Eth to Usd Price Feed Address
//         s_priceFeed = AggregatorV3Interface(
//             0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
//         );
//     }

//     //* Using ChainLink Price Converter to Convert USD to ETH
//     using PriceConverter for uint256;

//     function exchange() external payable returns (uint256) {
//         uint256 amount = msg.value.getConversionRate(s_priceFeed);
//     }
// }
