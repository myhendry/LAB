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

    it("should returns nums[0]", async () => {
      const num = await demoContract.nums(0);
      expect(num.toString()).to.be.equal("1");
    });

    it("should console", async () => {
      const res = await demoContract.connect(user2).transfer("yep");
      expect(res).to.be.equal("yep");
    });

    it("should change nums[1]", async () => {
      let beforeChangeNum;
      let afterChangeNum;
      beforeChangeNum = await demoContract.nums(1);
      expect(beforeChangeNum.toString()).to.be.equal("2");

      await demoContract.connect(user2).change(1000);

      afterChangeNum = await demoContract.nums(1);
      expect(afterChangeNum).to.be.equal("1000");
    });

    it("should remove item in nums", async () => {
      const numsArr = await demoContract.getArr();
      expect(numsArr.length).to.be.equal(4);
      demoContract.remove(1);
      const numsArrAfter = await demoContract.getArr();
      expect(numsArrAfter.length).to.be.equal(3);
    });

    it("should delete value in nums", async () => {
      const numsArr = await demoContract.getArr();
      expect(numsArr.length).to.be.equal(3);
      //console.log(numsArr);
      demoContract.removeValue(1);
      const numsArrAfter = await demoContract.getArr();
      //console.log(numsArrAfter);
      expect(numsArrAfter.length).to.be.equal(3);
    });

    it("should set new savings and get correct savings", async () => {
      await demoContract.connect(user2).setSavings(1);
      const amt = await demoContract.connect(user2).getSavings();
      expect(amt).to.be.equal(1);
    });

    it("should set new balance and get correct balance", async () => {
      await demoContract.setBalance(user2.address, 1);
      await demoContract.setBalance(user3.address, 3);
      const val1 = await demoContract.first();
      expect(val1).to.be.equal(1);
      const val2 = await demoContract.last();
      expect(val2).to.be.equal(3);
      const len1 = await demoContract.getSize();
      expect(len1).to.be.equal(2);
      const val3 = await demoContract.get(1);
      expect(val3).to.be.equal(3);
    });
  });
});
