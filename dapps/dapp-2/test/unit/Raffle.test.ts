import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { assert, expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { VRFCoordinatorV2Mock } from "./../../typechain/VRFCoordinatorV2Mock.d";
import { Raffle } from "./../../typechain/Raffle.d";
import { VRFConsumerBaseV2 } from "./../../typechain/VRFConsumerBaseV2.d";
import { MockV3Aggregator } from "./../../typechain/MockV3Aggregator.d";
import { developmentChains, networkConfig } from "../../helper-hardhat-config";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Raffle", () => {
      let raffle: Raffle;
      let mockV3Aggregator: MockV3Aggregator;
      let vrfCoordinatorV2Mock: VRFConsumerBaseV2;
      let raffleEntranceFee: any;
      let deployer: SignerWithAddress;
      let user1: SignerWithAddress;
      const sendValue = ethers.utils.parseEther("1");
      const chainId = network.config.chainId as number;

      beforeEach(async () => {
        const accounts: SignerWithAddress[] = await ethers.getSigners();
        [deployer, user1] = accounts;
        await deployments.fixture(["all"]);

        raffle = await ethers.getContract("Raffle", deployer);
        vrfCoordinatorV2Mock = await ethers.getContract(
          "VRFCoordinatorV2Mock",
          deployer
        );

        raffleEntranceFee = await raffle.getEntranceFee();
      });

      describe("Raffle Constructor", async () => {
        it("initializes the raffle correctly", async () => {
          // Ideally we make our tests have just 1 assert per "it"
          const raffleState = await raffle.getRaffleState();
          assert.equal(raffleState.toString(), "0");

          const interval = await raffle.getInterval();
          assert.equal(
            interval.toString(),
            networkConfig[chainId]["keepersUpdateInterval"]
          );
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

      describe("enterRaffle", async () => {
        it("Reverts if you don't send enough ETH", async () => {
          await expect(raffle.enterRaffle()).to.be.revertedWith(
            "Raffle__NotEnoughETHEntered"
          );
        });

        it("Records Players when they enter", async () => {
          await raffle.enterRaffle({ value: raffleEntranceFee });
          const playerFromContract = await raffle.getPlayer(0);
          assert.equal(playerFromContract, deployer.address);
        });
      });

      describe("test", async () => {
        it("ETH", async () => {});
      });

      describe("test", async () => {
        it("ETH", async () => {});
      });
    });
