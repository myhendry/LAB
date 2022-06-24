import { expect } from "chai";
import { ethers } from "hardhat";
import { networkConfig } from "../helper-hardhat-config";

describe("FundMe", function () {
  // it("Should return the new fundMe", async function () {
  //   const FundMe = await ethers.getContractFactory("FundMe");
  //   const fundMe = await FundMe.deploy(networkConfig[31337]["ethUsdPriceFeed"]);
  //   await fundMe.deployed();
  //   console.log("fundMe Address", fundMe.address);
  // });
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
