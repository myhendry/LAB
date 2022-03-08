# Ethereum Lottery

## Overview

This project is a blockchain-based lottery which allows users to enter by paying the entry fee of $50 USD. The winner is determined by obtaining a verifiably random number from a Chainlink oracle, and paying out the contract balance to the corresponding user. The purpose of this project is to gain experience with powerful tools such as [Hardhat](https://hardhat.org/), [Chainlink](https://chain.link/) and [OpenZeppelin](https://openzeppelin.com/).

## Setup

1. Clone the repository
2. Run `npm install`
3. Create a `secrets.json` file with the following contents:

```
    {
        "alchemyMainnetUrl": "",
        "alchemyRinkebyUrl": "",
        "rinkebySecretKey": ""
    }
```

## Deploying locally

1. Open a terminal window and run `npx hardhat node`
2. Open a second terminal window
3. Run `npx hardhat run scripts/deploy.js --network localhost`
4. Note the addresses of the Lottery and LinkToken contracts

## Testing

- Unit test: run `npx hardhat test`
- Integration test: run `npx hardhat run test/test_lottery_integration --network rinkeby`

## Tasks

1. Run `npx hardhat startLottery <Lottery address> --network localhost`
2. Run `npx hardhat enterLottery <Lottery address> --network localhost`
3. Run `npx hardhat fundWithLink <Lottery address> <LinkToken address> --network localhost`
4. Run `npx hardhat endLottery <Lottery address> --network localhost`

npx hardhat deploy --network localhost // localhost
npx hardhat deploy --network hardhat // hardhat
npx hardhat deploy --network rinkeby // rinkeby

npx hardhat test --network localhost // localhost
npx hardhat test --network hardhat // hardhat
npx hardhat test --network rinkeby // rinkeby

# TROUBLESHOOT

_Could not resolve dependency_
https://github.com/DeborahK/Angular-GettingStarted/issues/143
https://github.com/dethcrypto/TypeChain/issues/406

npm outdated
npm i --force

# FAQ

_Task vs Script_
https://ethereum.stackexchange.com/questions/83656/where-does-the-line-blur-between-a-task-and-a-script-in-hardhat/93433

[Createing a Lottery with Hardhat and ChainLink](https://dev.to/johbu/creating-a-lottery-with-hardhat-and-chainlink-385f)

```
mkdir cryptoLottery
cd cryptoLottery
npm init -y
yarn add hardhat --dev
npx hardhat (Basic, Advanced Template)
yarn add hardhat-deploy @appliedblockchain/chainlink-plugins-fund-link --dev

```
