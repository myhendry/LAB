import { deployments, ethers, getNamedAccounts } from "hardhat";
import { assert } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { FundMe } from "./../../typechain/FundMe.d";
import { MockV3Aggregator } from "./../../typechain/MockV3Aggregator.d";
import { networkConfig } from "../../helper-hardhat-config";

describe("FundMe", function () {
  let fundMe: FundMe;
  let mockV3Aggregator: MockV3Aggregator;
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;

  beforeEach(async () => {
    const accounts: SignerWithAddress[] = await ethers.getSigners();
    [deployer, user1] = accounts;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });

  describe("constructor", async () => {
    it("sets the aggregator addresses correctly", async () => {
      const res = await fundMe.getPriceFeed();
      assert.equal(res, mockV3Aggregator.address);
    });
  });
});

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });
