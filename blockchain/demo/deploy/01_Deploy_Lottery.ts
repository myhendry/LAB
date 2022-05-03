import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../chainlink.config";
import { NETWORK } from "../types";

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  ethers,
}: HardhatRuntimeEnvironment) => {
  const { deploy, get, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  let linkToken;
  let linkTokenAddress;
  let vrfCoordinatorMock;
  let vrfCoordinatorAddress;
  let priceFeedMock;
  let priceFeedAddress;
  let additionalMessage = "";

  if (chainId == NETWORK.HARDHAT) {
    linkToken = await get("LinkToken");
    linkTokenAddress = linkToken.address;
    vrfCoordinatorMock = await get("VRFCoordinatorMock");
    vrfCoordinatorAddress = vrfCoordinatorMock.address;
    priceFeedMock = await get("MockV3Aggregator");
    priceFeedAddress = priceFeedMock.address;
    additionalMessage =
      " --linkaddress " +
      linkTokenAddress +
      " --fundamount " +
      config[chainId].fundAmount;
  } else {
    priceFeedAddress = config[chainId].price_feed_address;
    linkTokenAddress = config[chainId].linkToken;
    vrfCoordinatorAddress = config[chainId].vrfCoordinator;
  }

  const keyHash = config[chainId].keyHash;
  const fee_payable = config[chainId].fee;

  const lottery = await deploy("Lottery", {
    from: deployer,
    args: [
      priceFeedAddress,
      vrfCoordinatorAddress,
      linkTokenAddress,
      ethers.utils.parseUnits(fee_payable, 18),
      keyHash,
    ],
    log: true,
  });

  log("Run the following command to fund contract with LINK:");
  log(
    "npx hardhat fund-link --contract " +
      lottery.address +
      " --network " +
      config[chainId].name +
      additionalMessage
  );
  log("----------------------------------------------------");
};

export default func;

//module.exports.tags = ["all", "main"];
func.tags = ["all", "main"];
