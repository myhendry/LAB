import { deployments, ethers, getNamedAccounts } from "hardhat";
import { assert, expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { FundMe } from "./../../typechain/FundMe.d";
import { MockV3Aggregator } from "./../../typechain/MockV3Aggregator.d";
import { networkConfig } from "../../helper-hardhat-config";

describe("FundMe", function () {
  let fundMe: FundMe;
  let mockV3Aggregator: MockV3Aggregator;
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  const sendValue = ethers.utils.parseEther("1");

  beforeEach(async () => {
    const accounts: SignerWithAddress[] = await ethers.getSigners();
    [deployer, user1] = accounts;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });

  describe("Constructor", async () => {
    it("Sets the aggregator addresses correctly", async () => {
      const res = await fundMe.getPriceFeed();
      assert.equal(res, mockV3Aggregator.address);
    });
  });

  describe("Fund", async () => {
    it("Fails if you don't send enough ETH", async () => {
      await expect(fundMe.fund()).to.be.revertedWith(
        "You need to spend more ETH!"
      );
    });

    it("Updates the amount funded data structure", async () => {
      await fundMe.fund({ value: sendValue });
      const response = await fundMe.getAddressToAmountFunded(deployer.address);
      assert.equal(response.toString(), sendValue.toString());
    });

    it("Adds funder to array of funders", async () => {
      await fundMe.fund({ value: sendValue });
      const response = await fundMe.getFunder(0);
      assert.equal(response, deployer.address);
    });
  });

  describe("Withdraw", async () => {
    beforeEach(async () => {
      await fundMe.fund({ value: sendValue });
    });

    it("Withdraws ETH from a single funder", async () => {
      const startingFundBalance = await fundMe.provider.getBalance(
        fundMe.address
      );
      const startingDeployerBalance = await fundMe.provider.getBalance(
        deployer.address
      );

      const txResponse = await fundMe.withdraw();
      const txReceipt = await txResponse.wait();
      const { gasUsed, effectiveGasPrice } = txReceipt;
      const gasCost = gasUsed.mul(effectiveGasPrice);

      const endingFundBalance = await fundMe.provider.getBalance(
        fundMe.address
      );
      const endingDeployerBalance = await fundMe.provider.getBalance(
        deployer.address
      );

      assert.equal(endingFundBalance.toNumber(), 0);
      assert.equal(
        startingFundBalance.add(startingDeployerBalance).toString(),
        endingDeployerBalance.add(gasCost).toString()
      );
    });
  });
});
