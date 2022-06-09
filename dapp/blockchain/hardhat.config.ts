import dotenv from "dotenv-safe";
dotenv.config();
import { HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import { task, types } from "hardhat/config";
import "solidity-coverage";
import "@appliedblockchain/chainlink-plugins-fund-link";
interface Etherscan {
  etherscan: { apiKey: string | undefined };
}

type HardhatUserEtherscanConfig = HardhatUserConfig & Etherscan;

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
const ACCOUNT_PRIVATE_KEY1 =
  process.env.ACCOUNT_PRIVATE_KEY1! ||
  "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"; // well known private key
const ACCOUNT_PRIVATE_KEY2 = process.env.ACCOUNT_PRIVATE_KEY2!;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

//* task
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

//* task, addParam, setAction
task("balance", "Get Account Balance")
  .addParam("account", "The account's address")
  .setAction(async (args, hre) => {
    const balanceInWei = (
      await hre.ethers.provider.getBalance(args.account)
    ).toString();
    const balanceInEther = hre.ethers.utils.formatEther(balanceInWei);
    console.log("balanceInEther", balanceInEther);
  });

//* task, addParam, addOptionalParam, runSuper, typings
task("hello", "Prints a Greeting")
  .addParam("account", "The account's balance", "", types.string)
  .addOptionalParam("name", "The account's name")
  .setAction(async (args, hre, runSuper) => {
    console.log("runSuper", runSuper.isDefined);
    console.log("args", args);
  });

const config: HardhatUserEtherscanConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      { version: "0.7.6" },
      { version: "0.8.0" },
      { version: "0.8.1" },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      },
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY1, ACCOUNT_PRIVATE_KEY2],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY1, ACCOUNT_PRIVATE_KEY2],
    },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 200000,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
