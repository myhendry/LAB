import { Demo } from "./../typechain-types/Demo";
import { Deployment } from "hardhat-deploy/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { deployments, ethers } from "hardhat";
import { expect } from "chai";

describe("Demo Test", () => {
  let DemoContract: Deployment;
  let demoContract: Demo;

  before(async () => {
    // const accounts: SignerWithAddress[] = await ethers.getSigners();
    //     const [deployer, user2, user3] = accounts;

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
  });
});
