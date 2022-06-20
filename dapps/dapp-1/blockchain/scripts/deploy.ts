import { ethers, run, network } from "hardhat";

async function main() {
  // https://github.com/myhendry/LAB/blob/main/blockchain/demo/scripts/deploy.ts

  // https://ethereum.stackexchange.com/questions/122157/hardhat-stuck-testing-in-mainnet-by-default
  //* NETWORK
  const networkObj = await ethers.provider.getNetwork();
  console.log(
    `You are Deploying on Network Name ${networkObj.name}. The NetworkId is ${networkObj.chainId} \n`
  );

  /*
  ! Verifying contracts on Etherscan
  To update token information on Etherscan, the token contract address for the token must be verified. This is to ensure that the contract code is exactly what is being deployed onto the blockchain and also allows the public to audit and read the contract. Etherscan ensures that all token contract must be verified before they can be updated with information submitted by the contract owner.
  */

  const verify = async (contractAddress: string, args: any) => {
    console.log("Verifying Contract...");
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      });
    } catch (error: unknown) {
      const { message } = error as Error;
      if (message.toLowerCase().includes("already verified")) {
        console.log("Already Verified!");
      } else {
        console.log(error);
      }
    }
  };

  //* ACCOUNTS
  const [deployer, payer1] = await ethers.getSigners();
  console.log(
    `Deployer account address is ${deployer.address} and Payer1 account address is ${payer1.address} \n`
  );

  //! Deploying Smart Contracts
  let counterAddress;
  let demoAddress;
  let callDemoAddress;
  let accountFactoryAddress;
  let v3Address;
  let v2Address;
  let converterAddress;

  const counterFactory = await ethers.getContractFactory("Counter");
  // If we had constructor arguments, they would be passed into deploy()
  let counterContract = await counterFactory.deploy();
  await counterContract.deployed();
  counterAddress = counterContract.address;
  console.log(`Counter Mined! Counter Contract is at ${counterAddress} \n`);

  const demoFactory = await ethers.getContractFactory("Demo");
  let demoContract = await demoFactory.deploy();
  await demoContract.deployed();
  demoAddress = demoContract.address;
  console.log(`Demo Mined! Demo Address is at ${demoAddress} \n`);

  const callDemoFactory = await ethers.getContractFactory("CallDemo");
  let callDemoContract = await callDemoFactory.deploy();
  await callDemoContract.deployed();
  callDemoAddress = callDemoContract.address;
  console.log(`CallDemo Mined! CallDemo Address is at ${callDemoAddress} \n`);

  const accountFactory = await ethers.getContractFactory("AccountFactory");
  let accountFactoryContract = await accountFactory.deploy();
  await accountFactoryContract.deployed();
  accountFactoryAddress = accountFactoryContract.address;
  console.log(
    `AccountFactory Mined! AccountFactory Address is at ${accountFactoryAddress} \n`
  );

  const v2Factory = await ethers.getContractFactory("V2");
  let v2Contract = await v2Factory.deploy();
  await v2Contract.deployed();
  v2Address = v2Contract.address;
  console.log(`V2 Mined! V2 Address is at ${v2Address} \n`);

  const v3Factory = await ethers.getContractFactory("V3");
  let v3Contract = await v3Factory.deploy();
  await v3Contract.deployed();
  v3Address = v3Contract.address;
  console.log(`V3 Mined! V3 Address is at ${v3Address} \n`);

  // // const nftMarketplaceFactory = await ethers.getContractFactory(
  // //   "NFTMarketplace"
  // // );
  // // // If we had constructor arguments, they would be passed into deploy()
  // // let nftMarketplaceContract = await nftMarketplaceFactory.deploy();
  // // await nftMarketplaceContract.deployed();
  // // console.log("NFTMarketplace Mined!");

  //  ! Verifying contracts on Etherscan
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await counterContract.deployTransaction.wait(6);
    await verify(counterContract.address, []);
  }

  console.log(`The contract addresses are as follow: \n
  counterContractAddress: ${counterAddress}, \n
  demoContractAddress: ${demoAddress}, \n
  callDemoAddress: ${callDemoAddress}, \n
  accountFactoryAddress: ${accountFactoryAddress} \n 
  v2Address: ${v2Address} \n 
  v3Address: ${v3Address} \n 
  `);

  let config = `
  // Last Deployed on ${network.name} network
  export const counterContractAddress = "${counterAddress}"
  export const demoContractAddress = "${demoAddress}"
  export const callDemoContractAddress = "${callDemoAddress}"
  export const accountFactoryAddress = "${accountFactoryAddress}"
  export const v2Address = "${v2Address}"
  export const v3Address = "${v3Address}"
  `;

  writeAddressToFrontend(config);

  let startDir = __dirname + "/../typechain";
  let endDir = __dirname + "/../../web/typechain";
  copyFolderRecursiveSync(startDir, endDir);
}

const writeAddressToFrontend = (config: string) => {
  const fs = require("fs");

  const contractsDir = __dirname + "/../../web/config";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  let data = JSON.stringify(config);

  fs.writeFileSync(contractsDir + "/contract-address.ts", JSON.parse(data));
};

const copyFileSync = (source: string, target: string) => {
  const fs = require("fs");
  const path = require("path");

  let targetFile = target;

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
};

const copyFolderRecursiveSync = (
  source: string,
  target: string,
  isRoot: boolean = true
) => {
  const fs = require("fs");
  const path = require("path");

  let files = [];

  let targetFolder = isRoot ? target : path.join(target, path.basename(source));
  //console.log("target folder", targetFolder);

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file: any) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder, false);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
