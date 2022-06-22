type NetworkConfigType = {
  [key: number]: {
    name: string;
    ethUsdPriceFeed?: string;
  };
};

const networkConfig: NetworkConfigType = {
  31337: {
    name: "localhost",
  },
  4: {
    name: "rinkeby",
    ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  },
};

const developmentChains = ["hardhat", "localhost"];

export { networkConfig, developmentChains };
