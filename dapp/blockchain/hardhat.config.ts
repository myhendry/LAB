import dotenv from "dotenv-safe";
dotenv.config();
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import "@appliedblockchain/chainlink-plugins-fund-link";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/types";

import "./tasks";

type HardhatUserEtherscanConfig = HardhatUserConfig;

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
const ACCOUNT_PRIVATE_KEY1 =
  process.env.ACCOUNT_PRIVATE_KEY1! ||
  "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"; // well known private key
const ACCOUNT_PRIVATE_KEY2 = process.env.ACCOUNT_PRIVATE_KEY2!;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

const config: HardhatUserEtherscanConfig = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      },
      chainId: 31337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY1, ACCOUNT_PRIVATE_KEY2],
      chainId: 4,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY1, ACCOUNT_PRIVATE_KEY2],
      chainId: 42,
    },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
  },
  solidity: {
    compilers: [
      { version: "0.7.6" },
      { version: "0.8.0" },
      { version: "0.8.1" },
    ],
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
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
