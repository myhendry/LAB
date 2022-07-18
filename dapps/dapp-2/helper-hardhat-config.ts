import { ethers } from "hardhat";

type NetworkConfigType = {
  [key: number]: {
    name: string;
    keepersUpdateInterval: string;
    subscriptionId?: string;
    gasLane?: string;
    raffleEntranceFee?: string;
    callbackGasLimit?: string;
    ethUsdPriceFeed?: string;
    vrfCoordinatorV2?: string;
  };
};

const networkConfig: NetworkConfigType = {
  31337: {
    name: "localhost",
    subscriptionId: "588",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
    keepersUpdateInterval: "30",
    raffleEntranceFee: ethers.utils.parseEther("0.01").toString(), // 0.1 ETH
    callbackGasLimit: "500000", // 500,000 gas
  },
  4: {
    name: "rinkeby",
    subscriptionId: "6926",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
    keepersUpdateInterval: "30",
    // raffleEntranceFee: "100000000000000000", // 0.1 ETH
    raffleEntranceFee: ethers.utils.parseEther("0.01").toString(), // 0.1 ETH
    callbackGasLimit: "500000", // 500,000 gas
    vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;

export { networkConfig, developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS };