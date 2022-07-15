import { MockV3Aggregator } from "./../typechain/MockV3Aggregator.d";
import { VRFCoordinatorV2Mock } from "./../typechain/VRFCoordinatorV2Mock.d";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, network } from "hardhat";
import { developmentChains } from "../helper-hardhat-config";

const DECIMALS = "8";
const INITIAL_PRICE = "200000000000"; // 2000
const BASE_FEE = ethers.utils.parseEther("0.25"); // 0.25 is the premium. It costs 0.25 LINK
const GAS_PRICE_LINK = 1e9; // link per gas, Calculated value based on the gas price of the chain // 0.000000001 LINK per gas

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId as number;

  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks...");

    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    });

    log("MockV3Aggregator Deployed!");

    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: [BASE_FEE, GAS_PRICE_LINK],
    });

    log("VRFCoordinatorV2Mock Deployed!");
    log("Mocks Deployed!");
    log("------------------------------------------------");
    log(
      "You are deploying to a local network, you'll need a local network running to interact"
    );
    log(
      "Please run `npx hardhat console` to interact with the deployed smart contracts!"
    );
    log("------------------------------------------------");
  }
};

func.tags = ["all", "mocks"];

export default func;
