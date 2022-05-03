import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("######### Deploying Demo Contract #########");
  await deploy("Demo", {
    from: deployer,
    log: true,
    //     args: []
  });
};
export default func;

func.tags = ["demo"];
