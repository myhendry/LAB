import { ethers } from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import {
  Demo__factory,
  Demo,
  CallDemo__factory,
  CallDemo,
  AccountFactory,
  AccountFactory__factory,
  V3,
  V3__factory,
  V2,
  V2__factory,
} from "../typechain";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Demo", () => {
  let demo: Demo;
  let callDemo: CallDemo;
  let accountFactory: AccountFactory;
  let v2Factory: V2;
  let v3Factory: V3;
  let deployer: SignerWithAddress;
  let user2: SignerWithAddress;

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

    const v2TemplateFactory = (await ethers.getContractFactory(
      "V2",
      deployer
    )) as V2__factory;
    v2Factory = await v2TemplateFactory.deploy();
    await v2Factory.deployed();

    const v3TemplateFactory = (await ethers.getContractFactory(
      "V3",
      deployer
    )) as V3__factory;
    v3Factory = await v3TemplateFactory.deploy();
    await v3Factory.deployed();
  });

  describe("V3", async () => {
    it("successfully get chainlink aggregatorV3Interface version", async () => {
      const res = await v3Factory.getV3Version();
      expect(res.toString()).to.be.eq("4");
    });

    it("successfully get chainlink aggregatorV3Interface getLatestRoundData", async () => {
      const res = await v3Factory.getLatestRoundData();

      const ethUsd = await v3Factory.getConversionRate(1);
      expect(ethUsd.toNumber()).to.be.greaterThan(1000);
    });

    it("successfully fund with USD", async () => {
      await v3Factory
        .connect(user2)
        .fund({ value: ethers.utils.parseEther("0.01") });
      //       const res = await
      // console.log(res.toString());
      // expect(res.toNumber()).to.be.greaterThan(10000000);
    });
  });
});
