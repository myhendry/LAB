## TODO

npx hardhat help

npx hardhat <task> / npx hardhat <task> --network rinkeby

npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/<key>

npm run test -- --network localhost

<!-- npx hardhat run --network hardhat scripts/deploy.ts -->

npx hardhat run --network localhost scripts/deploy.ts

npx hardhat console --network rinkeby

npx hardhat coverage

## NOTES

payable functions in solidity will return only the transaction hash

## Testing Environments

https://hardhat.org/hardhat-network/guides/mainnet-forking.html

https://ethereum.stackexchange.com/questions/104030/testing-token-with-uniswap-liquidity-provisioning-using-hardhat

## InternalError: Unknown transaction type 2 — Ethereum Development with Hardhat

https://yuichiroaoki.medium.com/internalerror-unknown-transaction-type-2-hardhat-403031bb0c11

## Typescript Solidity Dev Starter Kit

https://github.com/rhlsthrm/typescript-solidity-dev-starter-kit

https://rahulsethuram.medium.com/the-new-solidity-dev-stack-buidler-ethers-waffle-typescript-tutorial-f07917de48ae

ethers.utils.parseEther('0.2');
Wei to Eth: ethers.utils.formatEther(weiValue);
Wei to Gwei: ethers.utils.formatUnits(weiValue, 'gwei')

_Updated to use Hardhat!_

This is a starter kit for developing, testing, and deploying smart contracts with a full Typescript environment. This stack uses [Hardhat](https://hardhat.org) as the platform layer to orchestrate all the tasks. [Ethers](https://docs.ethers.io/v5/) is used for all Ethereum interactions and testing.

[Blog Post](https://medium.com/@rahulsethuram/the-new-solidity-dev-stack-buidler-ethers-waffle-typescript-tutorial-f07917de48ae)

## Using this Project

Clone this repository, then install the dependencies with `npm install`. Build everything with `npm run build`. https://hardhat.org has excellent docs, and can be used as reference for extending this project.

## Available Functionality

### Build Contracts and Generate Typechain Typeings

`npm run compile`

### Run Contract Tests & Get Callstacks

In one terminal run `npx hardhat node`

Then in another run `npm run test`

Notes:

- The gas usage table may be incomplete (the gas report currently needs to run with the `--network localhost` flag; see below).

### Run Contract Tests and Generate Gas Usage Report

In one terminal run `npx hardhat node`

Then in another run `npm run test -- --network localhost`

Notes:

- When running with this `localhost` option, you get a gas report but may not get good callstacks
- See [here](https://github.com/cgewecke/eth-gas-reporter#installation-and-config) for how to configure the gas usage report.

### Run Coverage Report for Tests

`npm run coverage`

Notes:

- running a coverage report currently deletes artifacts, so after each coverage run you will then need to run `npx hardhat clean` followed by `npm run build` before re-running tests
- the branch coverage is 75%

### Deploy to Ethereum

Create/modify network config in `hardhat.config.ts` and add API key and private key, then run:

`npx hardhat run --network rinkeby scripts/deploy.ts`

### Verify on Etherscan

Using the [hardhat-etherscan plugin](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html), add Etherscan API key to `hardhat.config.ts`, then run:

`npx hardhat verify --network rinkeby <DEPLOYED ADDRESS>`

PRs and feedback welcome!
