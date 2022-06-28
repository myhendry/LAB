import { deployments, ethers, getNamedAccounts } from "hardhat";
import { assert, expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { FundMe } from "./../../typechain/FundMe.d";
import { MockV3Aggregator } from "./../../typechain/MockV3Aggregator.d";
import { networkConfig } from "../../helper-hardhat-config";

describe("FundMe", () => {
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

    it.skip("Lists the account types", async () => {
      const deployer = (await getNamedAccounts()).deployer;
      console.log("Deployer", deployer);
      const accounts = await ethers.getSigners();
      console.log("0", accounts[0].address);
      console.log("1", accounts[1].address);
      console.log("2", accounts[2].address);
      console.log("3", accounts[3].address);
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
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );
      const startingDeployerBalance = await fundMe.provider.getBalance(
        deployer.address
      );

      const txResponse = await fundMe.withdraw();
      const txReceipt = await txResponse.wait();
      const { gasUsed, effectiveGasPrice } = txReceipt;
      const gasCost = gasUsed.mul(effectiveGasPrice);

      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );
      const endingDeployerBalance = await fundMe.provider.getBalance(
        deployer.address
      );

      assert.equal(endingFundMeBalance.toNumber(), 0);
      assert.equal(
        startingFundMeBalance.add(startingDeployerBalance).toString(),
        endingDeployerBalance.add(gasCost).toString()
      );
    });

    // this test is overloaded. Ideally we'd split it into multiple tests
    // but for simplicity we left it as one
    it("Allows us to withdraw with multiple funders", async () => {
      const accounts = await ethers.getSigners();

      for (let i = 1; i < 6; i++) {
        const fundMeConnectedContract = await fundMe.connect(accounts[i]);

        await fundMeConnectedContract.fund({ value: sendValue });
      }

      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );

      const startingDeployerBalance = await fundMe.provider.getBalance(
        deployer.address
      );

      const txResponse = await fundMe.withdraw();
      const txReceipt = await txResponse.wait();
      const { gasUsed, effectiveGasPrice } = txReceipt;
      const gasCost = gasUsed.mul(effectiveGasPrice);

      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );
      const endingDeployerBalance = await fundMe.provider.getBalance(
        deployer.address
      );

      assert.equal(endingFundMeBalance.toNumber(), 0);
      assert.equal(
        startingFundMeBalance.add(startingDeployerBalance).toString(),
        endingDeployerBalance.add(gasCost).toString()
      );

      // Make sure that the funds are reset properly
      await expect(fundMe.s_funders(0)).to.be.reverted;

      for (let i = 1; i < 6; i++) {
        assert.equal(
          await (
            await fundMe.getAddressToAmountFunded(accounts[i].address)
          ).toNumber(),
          0
        );
      }
    });

    it("Cheaper Withdraw Testing", async () => {
      const accounts = await ethers.getSigners();

      for (let i = 1; i < 6; i++) {
        const fundMeConnectedContract = await fundMe.connect(accounts[i]);

        await fundMeConnectedContract.fund({ value: sendValue });
      }

      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );

      const startingDeployerBalance = await fundMe.provider.getBalance(
        deployer.address
      );

      const txResponse = await fundMe.cheaperWithdraw();
      const txReceipt = await txResponse.wait();
      const { gasUsed, effectiveGasPrice } = txReceipt;
      const gasCost = gasUsed.mul(effectiveGasPrice);

      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );
      const endingDeployerBalance = await fundMe.provider.getBalance(
        deployer.address
      );

      assert.equal(endingFundMeBalance.toNumber(), 0);
      assert.equal(
        startingFundMeBalance.add(startingDeployerBalance).toString(),
        endingDeployerBalance.add(gasCost).toString()
      );

      // Make sure that the funds are reset properly
      await expect(fundMe.s_funders(0)).to.be.reverted;

      for (let i = 1; i < 6; i++) {
        assert.equal(
          await (
            await fundMe.getAddressToAmountFunded(accounts[i].address)
          ).toNumber(),
          0
        );
      }
    });

    it("Only allows the owner to withdraw", async () => {
      const accounts = await ethers.getSigners();
      const fundMeConnectedContract = await fundMe.connect(accounts[1]);
      await expect(fundMeConnectedContract.withdraw()).to.be.revertedWith(
        "FundMe__NotOwner"
      );
    });
  });
});
