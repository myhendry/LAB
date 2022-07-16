import { verify } from "./../utils/verify";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, network } from "hardhat";
import {
  developmentChains,
  networkConfig,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config";

const FUND_AMOUNT = "1000000000000000000000";

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId as number;
  let vrfCoordinatorV2Address, subscriptionId;

  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    );
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
    const transactionResponse = await vrfCoordinatorV2Mock.createSubscription();
    const transactionReceipt = await transactionResponse.wait();
    subscriptionId = transactionReceipt.events[0].args.subId;
    await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT);
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"];
    subscriptionId = networkConfig[chainId]["subscriptionId"];
  }

  log("----------------------------------------------------");

  const args = [
    vrfCoordinatorV2Address,
    networkConfig[chainId]["raffleEntranceFee"],
    networkConfig[chainId]["gasLane"],
    subscriptionId,
    networkConfig[chainId]["callbackGasLimit"],
    networkConfig[chainId]["keepersUpdateInterval"],
  ];

  const raffle = await deploy("Raffle", {
    from: deployer,
    args,
    log: true,
    waitConfirmations: developmentChains.includes(network.name)
      ? 1
      : VERIFICATION_BLOCK_CONFIRMATIONS,
  });

  log(`Raffle deployed at ${raffle.address}`);

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(raffle.address, args);
  }

  log("Verify Completed!!");
};

func.tags = ["all", "raffle"];

export default func;
