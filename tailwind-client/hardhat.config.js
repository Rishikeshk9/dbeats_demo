require('@nomiclabs/hardhat-waffle');
const fs = require('fs');
const privateKey =
  fs.readFileSync('.secret').toString().trim() ||
  '3c9b2a377363b3a7181170f33c011c0d827b956ea633eec097e771238fe71869';

module.exports = {
  defaultNetwork: 'matic',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://matic-mumbai.chainstacklabs.com',
      accounts: [privateKey],
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com',
      accounts: [privateKey],
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
