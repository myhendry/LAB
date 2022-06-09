// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "hardhat/console.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);

    function description() external view returns (string memory);

    function version() external view returns (uint256);

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

contract V3 {
    uint256 minimumSum = 50 * 1e18;

    //! To interact with external contracts, you can use
    //! Interfaces, npm, github link
    //* Using Interfaces
    address private chainlink_eth_usd =
        0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419;

    function getV3Version() external view returns (uint256) {
        uint256 res = AggregatorV3Interface(chainlink_eth_usd).version();
        return res;
    }

    function getLatestRoundData() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            chainlink_eth_usd
        );

        (
            uint80 roundId,
            int256 price,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        // ETH in terms of USD
        return uint256(price * 1e10); // 1**10 == 10000000000
    }

    function getConversionRate(uint256 ethAmount)
        public
        view
        returns (uint256)
    {
        uint256 ethPrice = getLatestRoundData();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd;
    }

    function fund() public payable {
        console.log("msg.value", msg.value);
        console.log("msg.sender", msg.sender);
        console.log("minimumSum", minimumSum);
        require(msg.value >= 10000000000000000, "Not enough value");
        // todo compare msg.sender to an address
    }
}
