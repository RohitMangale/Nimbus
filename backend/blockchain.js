// backend/blockchain.js

require('dotenv').config();
const Web3 = require('web3');
const PartRegistryJSON = require('./config/PartRegistry.json');

// Create Web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PARTNETWORK_RPC_URL));

// Create contract instance
const partRegistry = new web3.eth.Contract(
  PartRegistryJSON.abi,
  process.env.PARTNETWORK_CONTRACT_ADDR
);

// Verify blockchain connection on startup
async function verifyConnection() {
  try {
    const networkId = await web3.eth.net.getId();
    console.log(`✅ Connected to PartNetwork (Network ID: ${networkId})`);

    // optional: show contract address
    console.log(`🔗 PartRegistry Contract Address: ${partRegistry.options.address}`);

  } catch (error) {
    console.error('❌ Blockchain connection error:', error.message);
    process.exit(1); // stop server if blockchain isn't reachable
  }
}

// Immediately run connection check
verifyConnection();

// Export for use in routes
module.exports = {
  web3,
  partRegistry
};
