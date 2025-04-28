const express = require('express');
const router = express.Router();
const { registryA, registryB, registryM, web3A, web3B, web3M } = require('../blockchain');

// Improved network configuration handler
const getNetworkConfig = (network) => {
  const upperNetwork = network.toUpperCase();
  switch(upperNetwork) {
    case 'A': return { contract: registryA, web3: web3A };
    case 'B': return { contract: registryB, web3: web3B };
    case 'M': return { contract: registryM, web3: web3M };
    default: throw new Error(`Invalid network specified: ${network}`);
  }
};

// Enhanced CID validation
const isValidCID = (cid) => 
  typeof cid === 'string' && 
  cid.startsWith('Qm') && 
  cid.length === 46 && 
  /^[1-9A-HJ-NP-Za-km-z]{44}$/.test(cid.slice(2));

router.post('/mint/:network', async (req, res) => {
  try {
    const { id, maintenanceCID, certificateCID } = req.body;
    const network = req.params.network.toUpperCase();

    // Validate inputs
    const errors = [];
    if (typeof id !== 'number' || id <= 0) errors.push('ID must be positive integer');
    if (!isValidCID(maintenanceCID)) errors.push('Invalid maintenance CID');
    if (!isValidCID(certificateCID)) errors.push('Invalid certificate CID');
    
    if (errors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors 
      });
    }

    // Get network configuration
    const { contract, web3 } = getNetworkConfig(network);
    const [account] = await web3.eth.getAccounts();

    // Gas estimation with fallback
    let gasEstimate;
    try {
      gasEstimate = await contract.methods
        .mintPart(id, maintenanceCID, certificateCID)
        .estimateGas({ from: account });
    } catch (estimateError) {
      console.error('Gas estimation failed:', estimateError);
      return res.status(400).json({
        error: 'Transaction simulation failed',
        details: process.env.NODE_ENV === 'development' ? estimateError.message : null
      });
    }

    // Send transaction with gas buffer
    const tx = await contract.methods
      .mintPart(id, maintenanceCID, certificateCID)
      .send({
        from: account,
        gas: Math.floor(gasEstimate * 1.2), // 20% buffer
        gasPrice: await web3.eth.getGasPrice()
      });

    res.json({
      success: true,
      network,
      id,
      maintenanceCID,
      certificateCID,
      txHash: tx.transactionHash,
      blockNumber: tx.blockNumber
    });

  } catch (err) {
    console.error(`Mint Error [${req.params.network}]:`, err);
    
    const errorMessage = err.message.includes('revert') 
      ? 'Part ID already exists or contract error'
      : 'Blockchain transaction failed';

    const errorDetails = process.env.NODE_ENV === 'development' ? {
      message: err.message,
      stack: err.stack,
      network: req.params.network,
      input: req.body
    } : null;

    res.status(400).json({ 
      error: errorMessage,
      details: errorDetails
    });
  }
});

module.exports = router;