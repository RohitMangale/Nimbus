// blockchain.js
require('dotenv').config();
const Web3 = require('web3');
const PartRegistryJSON = require('./config/PartRegistry.json');

// Initialize all networks
const networks = {
  A: {
    web3: new Web3(process.env.COMPANYA_RPC_URL),
    contractAddr: process.env.COMPANYA_CONTRACT_ADDR
  },
  B: {
    web3: new Web3(process.env.COMPANYB_RPC_URL),
    contractAddr: process.env.COMPANYB_CONTRACT_ADDR
  },
  M: {
    web3: new Web3(process.env.MARKETPLACE_RPC_URL),
    contractAddr: process.env.MARKETPLACE_CONTRACT_ADDR
  }
};

// Create contract instances
const registryA = new networks.A.web3.eth.Contract(
  PartRegistryJSON.abi,
  networks.A.contractAddr
);

const registryB = new networks.B.web3.eth.Contract(
  PartRegistryJSON.abi,
  networks.B.contractAddr
);

const registryM = new networks.M.web3.eth.Contract(
  PartRegistryJSON.abi,
  networks.M.contractAddr
);

// Debugging function (properly wrapped in async)
async function debugNetwork(network) {
  try {
    const block = await networks[network].web3.eth.getBlockNumber();
    console.log(`${network} Network Status:`);
    console.log(`- Latest Block: ${block}`);
    console.log(`- Contract Address: ${networks[network].contractAddr}`);
  } catch (error) {
    console.error(`Debug failed for ${network}:`, error);
  }
}

// Call debug for all networks
Promise.all([
  debugNetwork('A'),
  debugNetwork('B'),
  debugNetwork('M')
]);

module.exports = {
  registryA,
  registryB,
  registryM,
  web3A: networks.A.web3,
  web3B: networks.B.web3,
  web3M: networks.M.web3
};