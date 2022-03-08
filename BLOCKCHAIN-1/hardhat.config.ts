// import { ethers } from "hardhat";
// import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-deploy";
import "@appliedblockchain/chainlink-plugins-fund-link";

import dotenv from "dotenv-safe";
dotenv.config();

// task("startLottery", "Starts the lottery")
//   .addPositionalParam("address", "The address of the lottery contract")
//   .setAction(async (args) => {
//     const { address } = args;
//     const Lottery = await ethers.getContractFactory("Lottery");
//     const lottery = await Lottery.attach(address);
//     await lottery.startLottery();
//     console.log("Lottery started");
//   });

// task("enterLottery", "Enters the lottery")
//   .addPositionalParam("address", "The address of the lottery contract")
//   .setAction(async (args) => {
//     const { address } = args;
//     const Lottery = await ethers.getContractFactory("Lottery");
//     const lottery = await Lottery.attach(address);
//     const value = await lottery.getEntranceFee();
//     await lottery.enter((overrides = { value: value }));
//     console.log("Entered lottery");
//   });

// task("fundWithLink", "Funds the lottery with LINK")
//   .addPositionalParam("contractAddress", "The address of the lottery contract")
//   .addPositionalParam("linkAddress", "The address of the LINK token")
//   .setAction(async (args) => {
//     const { contractAddress, linkAddress } = args;
//     const LinkToken = await ethers.getContractFactory("LinkToken");
//     const linkToken = await LinkToken.attach(linkAddress);
//     await linkToken.transfer(contractAddress, 1000000000000000);
//     console.log("Funded lottery with LINK");
//   });

// task("endLottery", "Ends the lottery")
//   .addPositionalParam("address", "The address of the lottery contract")
//   .setAction(async (args) => {
//     const { address } = args;
//     const Lottery = await ethers.getContractFactory("Lottery");
//     const lottery = await Lottery.attach(address);
//     const winner = await lottery.endLottery();
//     console.log(winner + " won the lottery");
//   });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_MAINNET_URL,
        gas: 10000,
      },
    },
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY_URL || "",
      chainId: 4,
      accounts: [
        `0x${process.env.PRIVATE_KEY_DEPLOYER}`,
        `0x${process.env.PRIVATE_KEY_USER_2}`,
        `0x${process.env.PRIVATE_KEY_USER_3}`,
      ].filter((x) => x !== undefined),
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      4: 0,
    },
    user2: {
      default: 1,
      4: 1,
    },
    user3: {
      default: 2,
      4: 2,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.4.11",
      },
      {
        version: "0.4.24",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.8.0",
      },
    ],
  },
  mocha: {
    timeout: 100000,
  },
  // gasReporter: {
  //   enabled: process.env.REPORT_GAS !== undefined,
  //   currency: "USD",
  // },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
};
