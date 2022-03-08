import { ethers, getChainId } from "hardhat";
import { NETWORK } from "./types";

const config = {
  [NETWORK.HARDHAT]: {
    name: "hardhat",
    price_feed_address: "0x9326BFA02ADD2366b30bacB125260Af641031331",
    keyHash:
      "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4",
    fee: "0.1",
    fundAmount: "10000000000000000000",
  },
  [NETWORK.RINKEBY]: {
    name: "rinkeby",
    price_feed_address: "0x9326BFA02ADD2366b30bacB125260Af641031331",
    linkToken: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
    vrfCoordinator: "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B",
    keyHash:
      "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311",
    fee: "0.1",
    fundAmount: "2000000000000000000",
  },
};

const autoFundCheck = async (
  contractAddr: string,
  networkName: string,
  linkTokenAddress: string,
  additionalMessage: string
) => {
  const chainId = await getChainId();
  console.log("Checking to see if contract can be auto-funded with LINK:");
  const amount = config[chainId].fundAmount;
  // check to see if user has enough LINK
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  const LinkToken = await ethers.getContractFactory("LinkToken");
  const linkTokenContract = new ethers.Contract(
    linkTokenAddress,
    LinkToken.interface,
    signer
  );
  const balanceHex = await linkTokenContract.balanceOf(signer.address);
  const balance = await ethers.BigNumber.from(balanceHex._hex).toString();
  const contractBalanceHex = await linkTokenContract.balanceOf(contractAddr);
  const contractBalance = await ethers.BigNumber.from(
    contractBalanceHex._hex
  ).toString();
  if (balance > amount && parseInt(amount) > 0 && contractBalance < amount) {
    // user has enough LINK to auto-fund
    // and the contract isn't already funded
    return true;
  } else {
    // user doesn't have enough LINK, print a warning
    console.log(
      "Account doesn't have enough LINK to fund contracts, or you're deploying to a network where auto funding isnt' done by default"
    );
    console.log(
      "Please obtain LINK via the faucet at https://" +
        networkName +
        ".chain.link/, then run the following command to fund contract with LINK:"
    );
    console.log(
      "npx hardhat fund-link --contract " +
        contractAddr +
        " --network " +
        networkName +
        additionalMessage
    );
    return false;
  }
};

export { autoFundCheck, config };
