import { network, ethers, getNamedAccounts } from "hardhat";
import { assert } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { FundMe } from "./../../typechain/FundMe.d";
import { developmentChains } from "../../helper-hardhat-config";

/*
 	! Staging Test is on Testnet so NO NEED for
	Mocks and fixtures
*/

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", () => {
      let fundMe: FundMe;
      let deployer: string;
      const sendValue = ethers.utils.parseEther("1");

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        console.log("deployer", deployer);
        fundMe = await ethers.getContract("FundMe", deployer);
      });

      it("Allows people to fund and withdraw", async () => {
        //todo change gasLimit
        await fundMe.fund({
          value: sendValue,
          // , gasLimit: 1000000
        });
        await fundMe.withdraw();
        const endingBalance = await fundMe.provider.getBalance(fundMe.address);
        assert.equal(endingBalance.toString(), "0");
      });
    });
