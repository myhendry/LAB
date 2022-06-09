import { sum } from "chain-utils";
import { ethers } from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";

import {
  Demo__factory,
  Demo,
  CallDemo__factory,
  CallDemo,
  AccountFactory,
  AccountFactory__factory,
} from "../typechain";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Demo", () => {
  let demo: Demo;
  let callDemo: CallDemo;
  let accountFactory: AccountFactory;
  let deployer: SignerWithAddress;
  let user2: SignerWithAddress;

  //! https://youtu.be/gyMwXuJrbJQ
  //! 4:53

  beforeEach(async () => {
    // 1
    const accounts = await ethers.getSigners();
    [deployer, user2] = accounts;

    // 2
    const demoFactory = (await ethers.getContractFactory(
      "Demo",
      deployer
    )) as Demo__factory;
    demo = await demoFactory.deploy();
    await demo.deployed();

    const callDemoFactory = (await ethers.getContractFactory(
      "CallDemo",
      deployer
    )) as CallDemo__factory;
    callDemo = await callDemoFactory.deploy();
    await callDemo.deployed();

    const accountTemplateFactory = (await ethers.getContractFactory(
      "AccountFactory",
      deployer
    )) as AccountFactory__factory;
    accountFactory = await accountTemplateFactory.deploy();
    await accountFactory.deployed();

    // 3
    const initialName = await demo.getName();
    expect(initialName).to.eq("hendry");
    expect(demo.address).to.properAddress;
  });

  // 4
  describe("check name", async () => {
    it("name should be hendry", async () => {
      let name = await demo.getName();
      expect(name).to.eq("hendry");
    });

    it("name should be hello world", async () => {
      await demo.setName("hello world");
      let name = await demo.getName();
      expect(name).to.eq("hello world");
    });
  });

  describe("test deposit and withdraw function", async () => {
    it("successfully deposit 0.2 Eth into Demo Contract", async () => {
      let tx; // https://stackoverflow.com/questions/70677788/when-is-tx-wait1-required

      tx = await deployer.sendTransaction({
        to: demo.address,
        value: ethers.utils.parseEther("0.2"),
      });
      await tx.wait();
      const demoBalance = await demo.getBalance();
      const balanceInEth = ethers.utils.formatEther(demoBalance.toString());
      expect(balanceInEth).to.eq("0.2");

      const signerBalance = await deployer.getBalance();
      const signerBalanceInEth = ethers.utils.formatEther(
        signerBalance.toString()
      );
      expect(parseInt(signerBalanceInEth)).to.be.lessThan(10_000);
    });

    it("successfully Deposit and Withdraw 0.1 Eth from Demo Contract", async () => {
      let tx;

      // Fund or Deposit Demo Contract with 0.2 Eth
      tx = await deployer.sendTransaction({
        to: demo.address,
        value: ethers.utils.parseEther("0.2"),
      });
      await tx.wait();

      // Get Current Demo Contract Balance in Eth
      let demoBalance = await demo.getBalance();
      let balanceInEth = ethers.utils.formatEther(demoBalance.toString());

      // Withdraw 0.1 Eth from Demo Contract
      await demo.withdraw(ethers.utils.parseEther("0.1"));

      // Get New Demo Contract Balance in Eth
      demoBalance = await demo.getBalance();
      balanceInEth = ethers.utils.formatEther(demoBalance.toString());
      expect(balanceInEth).to.eq("0.1");
    });
  });

  describe("test fund and unfund function", async () => {
    it("successfully fund", async () => {
      await demo.fund({ value: ethers.utils.parseEther("0.2") });
      const amount = await demo.checkFund(deployer.address);
      expect(ethers.utils.formatEther(amount)).to.be.eq("0.2");
    });

    it("successfully fund and unfund", async () => {
      let amount;

      // Get Deployer Balance BEFORE funding
      const bal1 = await deployer.getBalance();
      // Deployer Fund Contract
      await demo.fund({ value: ethers.utils.parseEther("2.0") });
      // Get Deployer Balance AFTER funding
      const bal2 = await deployer.getBalance();
      // Compare Deployer Balance Before and After funding
      const diff1 =
        parseInt(ethers.utils.formatEther(bal1)) -
        parseInt(ethers.utils.formatEther(bal2));
      expect(diff1).to.be.eq(2);
      // Get Contract Balance After Funding
      const bal_demo1 = await demo.getBalance();
      expect(ethers.utils.formatEther(bal_demo1)).to.be.eq("2.0");
      // Check Deployer Balance in Mapping Before unfund
      amount = await demo.checkFund(deployer.address);
      expect(ethers.utils.formatEther(amount)).to.be.eq("2.0");
      // Unfund
      await demo.unfund();
      // Check Deployer Balance in Mapping After unfund
      amount = await demo.checkFund(deployer.address);
      expect(ethers.utils.formatEther(amount)).to.be.eq("0.0");
      // Check Deployer Balance after unfund
      const bal3 = await deployer.getBalance();
      // console.log("bal3", ethers.utils.formatEther(bal3));
      // Check Contract Balance after unfund
      const bal_demo2 = await demo.getBalance();
      expect(ethers.utils.formatEther(bal_demo2)).to.be.eq("0.0");
    });
  });

  describe("test call other contract function", async () => {
    it("call setName and getName functions successfully in CallDemo", async () => {
      let name = await callDemo.getName(demo.address);
      expect(name).to.be.eq("hendry");
      await callDemo.setName(demo.address, "steve");
      name = await callDemo.getName(demo.address);
      expect(name).to.be.eq("steve");
    });
  });

  describe("New Factory", async () => {
    it("successfully uses factory to create new accounts", async () => {
      await accountFactory
        .connect(deployer)
        .createAccount(user2.address, { value: 200 });
      const acc1 = await accountFactory.accounts(0);
      console.log("acc1", acc1);
      console.log(
        "deployer balance",
        await (await deployer.getBalance()).toString()
      );
      console.log("user2 balance", await (await user2.getBalance()).toString());
      console.log("deployer address", deployer.address);
      console.log("user2 address", user2.address);
      console.log(sum(10, 20));
    });
  });

  describe("test chainlink functions", async () => {
    it("successfully convert", async () => {
      const res = await demo.exchange({
        value: ethers.utils.parseEther("0.1"),
      });
      // expect(res).to.be.revertedWith("You need more Eth");
    });

    it("successfully test conversion", async () => {
      const amount = await demo.testConversion();
      expect(amount).to.be.gte(BigNumber.from("10000000000"));
    });
  });
});
