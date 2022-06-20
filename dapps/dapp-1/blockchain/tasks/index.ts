import { task, types } from "hardhat/config";

//! Task
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

task("block-number", "Prints the current block number").setAction(
  async (args, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current Block Number: ${blockNumber}`);
  }
);
