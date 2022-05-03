import { Deployment } from "hardhat-deploy/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { deployments, ethers } from "hardhat";
import { expect } from "chai";

import { Demo } from "./../typechain-types/Demo";

describe("Demo Test", () => {
  let DemoContract: Deployment;
  let demoContract: Demo;
  let deployer: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;

  before(async () => {
    const accounts: SignerWithAddress[] = await ethers.getSigners();
    [deployer, user2, user3] = accounts;

    await deployments.fixture(["demo"]);

    DemoContract = await deployments.get("Demo");
    demoContract = (await ethers.getContractAt(
      "Demo",
      DemoContract.address
    )) as Demo;
  });

  describe("Demo Details", () => {
    it("should return name", async () => {
      const name = await demoContract.name();
      expect(name).to.be.equal("Hello Demo");
    });

    it("should return ", async () => {
      await demoContract.addMember("Alvin");
      const m1 = await demoContract.members(0);
      console.log(m1);
      const r1 = await demoContract.membersCount();
      console.log(r1);
      await demoContract.transfer("hey");
      const r2 = await demoContract.pureFunc();
      console.log(r2.toNumber());
      const r3 = await demoContract.globalVariables();
      console.log(r3);
      const r4 = await demoContract.modFunc(6);
      console.log(r4.toNumber());
      await demoContract.changeArr(100);
      const r5 = await demoContract.nums(4);
      console.log(r5);
      const r6 = await demoContract.returnArray();
      console.log(r6);
      await demoContract.addBalance(150);
      const r7 = await demoContract.getBalance();
      console.log(r7.toNumber());
    });
  });
});
