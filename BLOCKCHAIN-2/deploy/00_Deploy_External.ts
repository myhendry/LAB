import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { NETWORK } from "../types";

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  if (chainId == NETWORK.HARDHAT) {
    log("Local Network Detected, Deploying external contracts");
    await deploy("MockV3Aggregator", {
      from: deployer,
      log: true,
      args: [8, 200000000000],
    });
    const linkToken = await deploy("LinkToken", { from: deployer, log: true });
    await deploy("VRFCoordinatorMock", {
      from: deployer,
      log: true,
      args: [linkToken.address],
    });
  }
};

export default func;

// module.exports.tags = ["all", "mocks", "main"];
func.tags = ["all", "mocks", "main"];
