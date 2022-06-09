// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "hardhat/console.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";

// interface UniswapV2Factory {
//     function getPair(address tokenA, address tokenB)
//         external
//         view
//         returns (address pair);
// }

// interface UniswapV2Pair {
//     function getReserves()
//         external
//         view
//         returns (
//             uint112 reserve0,
//             uint112 reserve1,
//             uint32 blockTimestampLast
//         );
// }

contract V2 {
    //* Using Imported Interfaces
    address private factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address private weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address private usdt = 0xdAC17F958D2ee523a2206206994597C13D831ec7;

    function getTokenReserves() external view returns (uint256, uint256) {
        address pair = IUniswapV2Factory(factory).getPair(dai, usdt);
        (uint256 reserve0, uint256 reserve1, ) = IUniswapV2Pair(pair)
            .getReserves();

        return (reserve0, reserve1);
    }
}
