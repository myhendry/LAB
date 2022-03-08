import { assert, expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers, run, getChainId, deployments } from "hardhat";
import { Contract } from "ethers";
import { Deployment } from "hardhat-deploy/types";

import { config, autoFundCheck } from "../chainlink.config";
import { VRFCoordinatorMock } from "./../typechain-types/VRFCoordinatorMock";
import { LinkToken } from "./../typechain-types/LinkToken";
import { Lottery } from "./../typechain-types/Lottery";

describe("Lottery Unit Tests", () => {
  let Lottery: Deployment;
  let lottery: Lottery;
  let LinkToken: Deployment;
  let linkToken: LinkToken;
  let VRFCoordinatorMock: Deployment;
  let vrfCoordinatorMock: Contract;
  let chainId: string;
  let deployer: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let tx: any;

  before(async () => {
    const accounts: SignerWithAddress[] = await ethers.getSigners();
    [deployer, user2, user3] = accounts;
    chainId = await getChainId();

    await deployments.fixture(["main"]);

    VRFCoordinatorMock = await deployments.get("VRFCoordinatorMock");
    vrfCoordinatorMock = (await ethers.getContractAt(
      "VRFCoordinatorMock",
      VRFCoordinatorMock.address
    )) as VRFCoordinatorMock;

    LinkToken = await deployments.get("LinkToken");
    linkToken = (await ethers.getContractAt(
      "LinkToken",
      LinkToken.address
    )) as LinkToken;

    Lottery = await deployments.get("Lottery");
    lottery = (await ethers.getContractAt(
      "Lottery",
      Lottery.address
    )) as Lottery;
  });

  describe("Gets Chain Details", () => {
    it("should return lottery", async () => {
      console.log("chainId", chainId);
      console.log(deployer.address);
      console.log(user2.address);
      const networkName = config[chainId].name;
      const additionalMessage = " --linkaddress " + linkToken.address;
      if (
        await autoFundCheck(
          lottery.address,
          networkName,
          linkToken.address,
          additionalMessage
        )
      ) {
        // Funding with Link Token ...
        await run("fund-link", {
          contract: lottery.address,
          linkaddress: linkToken.address,
        });
      }

      const user1Balance = await ethers.provider.getBalance(deployer.address);
      console.log("user 1 balance", ethers.utils.formatEther(user1Balance));

      console.log("fee", await lottery.fee());
      console.log("usdEntryFee", await lottery.usdEntranceFee());
      console.log("getEntranceFee", await lottery.getEntranceFee());

      tx = await lottery.startLottery();
      await tx.wait();

      tx = await lottery.connect(user2).enter({
        value: ethers.utils.parseUnits("5", 16),
      });
      await tx.wait();
      tx = await lottery.connect(user3).enter({
        value: ethers.utils.parseUnits("5", 16),
      });
      await tx.wait();
      console.log("players", await lottery.getPlayers());

      const startBalance = await ethers.provider.getBalance(lottery.address);
      const ether_balance_lottery_start =
        ethers.utils.formatEther(startBalance);
      console.log("ether_balance_lottery_start", ether_balance_lottery_start);

      console.log("lottery_state", await lottery.lotteryState());

      tx = await lottery.endLottery();
      const receipt = await tx.wait();
      const requestId = receipt.events[2].topics[1];
      // const requestId = receipt.events[0].topics[1];
      console.log("requestId", requestId);

      console.log("lottery_state", await lottery.lotteryState());

      const STATIC_RNG = 345;
      vrfCoordinatorMock.callBackWithRandomness(
        requestId,
        STATIC_RNG,
        lottery.address
      );

      // todo lotteryWinner not working yet - show address[0]
      const lotteryWinner = await lottery.latestWinner();
      console.log("lotteryWinner", lotteryWinner);

      const endBalance = await ethers.provider.getBalance(lottery.address);
      const ether_balance_lottery_end = ethers.utils.formatEther(endBalance);
      console.log("ether_balance_lottery_end", ether_balance_lottery_end);

      console.log("players", await lottery.getPlayers());
      console.log("lottery_state", await lottery.lotteryState());
      ``;
    });
  });
});
