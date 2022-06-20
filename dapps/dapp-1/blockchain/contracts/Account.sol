// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

//* New (Factory Account)
// https://youtu.be/J2Wp2SHq1Qo
// https://solidity-by-example.org/new-contract/
contract Account {
    address public bank;
    address public owner;

    constructor(address _owner) payable {
        bank = msg.sender;
        owner = _owner;
    }
}

contract AccountFactory {
    Account[] public accounts;

    function createAccount(address _owner) external payable {
        Account account = new Account{value: 111}(_owner);
        console.log("owner", _owner);
        address bank = account.bank();
        console.log("bank", bank);
        address owner = account.owner();
        console.log("owner", owner);
        accounts.push(account);
    }
}
