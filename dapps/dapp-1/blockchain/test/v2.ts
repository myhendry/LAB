import { ethers } from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { V2__factory, V2 } from "../typechain";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("V2", () => {
  let v2: V2;
  let deployer: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    [deployer, user2] = accounts;

    const v2Factory = (await ethers.getContractFactory(
      "V2",
      deployer
    )) as V2__factory;
    v2 = await v2Factory.deploy();
    await v2.deployed();
  });

  describe("V2 getTokenReserves", async () => {
    it("successfully get v2 token reserves", async () => {
      const res = await v2.getTokenReserves();
      console.log(res[0].toString(), res[1].toString());
    });
  });
});
