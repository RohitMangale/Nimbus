const express = require('express');
const router = express.Router();
const { partRegistry, web3 } = require('../blockchain'); // Single instance

// CID Validation
const isValidCID = (cid) =>
  typeof cid === 'string' &&
  cid.startsWith('Qm') &&
  cid.length === 46 &&
  /^[1-9A-HJ-NP-Za-km-z]{44}$/.test(cid.slice(2));

  // Function to get parts by owner address from blockchain
  const getPartsByOwner = async (ownerName) => {
    try {
      const parts = await partRegistry.methods.getPartsByOwner(ownerName).call();
      return parts;
    } catch (err) {
      console.error('Error fetching parts from blockchain:', err);
      throw err;
    }
  };
  const verifyOwnership = async (partId, ownerAddress) => {
    const part = await partRegistry.methods.parts(partId).call();
    if (part.owner.toLowerCase() !== ownerAddress.toLowerCase()) {
      throw new Error('Caller is not the owner of this part');
    }
  };

// Create Part
// Create Part
router.post('/create', async (req, res) => {
  try {
    const {
      owner,
      serialId,
      partDescription,
      manufacturingCompany,
      manufacturingDate,
      initialMaintenanceCID,
      initialDescription,
       // <-- New field
    } = req.body;

    // Input Validation
    const errors = [];
    if (!serialId) errors.push('Serial ID is required');
    if (!partDescription) errors.push('Part description is required');
    if (!manufacturingCompany) errors.push('Manufacturing company is required');
    if (!manufacturingDate || isNaN(manufacturingDate)) errors.push('Valid manufacturing date required');
    if (!initialMaintenanceCID || !isValidCID(initialMaintenanceCID)) errors.push('Valid initial maintenance CID required');
    if (!initialDescription) errors.push('Initial description required');
    if (!owner || typeof owner !== 'string') errors.push('Valid owner name/address is required');

    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    // Estimate Gas
    const gasEstimate = await partRegistry.methods
      .createPart(
        owner,
        serialId,
        partDescription,
        manufacturingCompany,
        manufacturingDate,
        initialMaintenanceCID,
        initialDescription
      )
      .estimateGas({ from: sender });

    // Send Transaction
    const tx = await partRegistry.methods
      .createPart(
        owner,
        serialId,
        partDescription,
        manufacturingCompany,
        manufacturingDate,
        initialMaintenanceCID,
        initialDescription,
        // <-- Pass owner to contract
      )
      .send({
        from: sender,
        gas: Math.floor(gasEstimate * 1.2),
        gasPrice: await web3.eth.getGasPrice()
      });

    res.json({
      success: true,
      txHash: tx.transactionHash,
      blockNumber: tx.blockNumber
    });

  } catch (err) {
    console.error(`Create Part Error:`, err);
    res.status(400).json({
      error: 'Blockchain transaction failed',
      details: err.message
    });
  }
});


// List route - keep existing validation removal
router.post('/list', async (req, res) => {
  try {
    const { serialId, price } = req.body;
    const [account] = await web3.eth.getAccounts();

    // Get part ID from contract
    const partId = await partRegistry.methods.serialToPartId(serialId).call();
    
    const tx = await partRegistry.methods
      .listForSaleBySerial(serialId, price)
      .send({ 
        from: account, 
        gas: 500000 
      });

    res.json({ 
      success: true,
      txHash: tx.transactionHash,
      partId: partId.toString()
    });
    
  } catch (err) {
    console.error('List Error:', err);
    res.status(400).json({ 
      error: err.message,
      contractError: err.data?.message
    });
  }
});
// Unlist route - critical fix
router.post('/unlist', async (req, res) => {
  try {
    const { serialId } = req.body;
    const [account] = await web3.eth.getAccounts();
    const gasPrice = await web3.eth.getGasPrice();

    // First get part ID from serial
    const partId = await partRegistry.methods.serialToPartId(serialId).call();
    
    const tx = await partRegistry.methods
      .unlistFromSaleBySerial(serialId)
      .send({
        from: account,
        gas: 300000,
        gasPrice: gasPrice
      });

    res.json({ 
      success: true,
      txHash: tx.transactionHash,
      partId: partId.toString()
    });

  } catch (err) {
    console.error('Unlist Error:', err);
    res.status(400).json({
      error: err.message,
      contractError: err.data?.message
    });
  }
});

router.get('/marketplace', async (req, res) => {
  try {
    // First get all listed part IDs
    const totalParts = await partRegistry.methods.totalParts().call();
    const listedParts = [];

    // Manual iteration to find listed parts
    for (let id = 0; id < totalParts; id++) {
      const part = await partRegistry.methods.parts(id).call();
      if (part.forSale) {
        const details = await partRegistry.methods.getPartDetails(id).call();
        listedParts.push({
          id: id.toString(),
          serialId: part.serialId,
          owner: details.owner,
          description: details.partDescription,
          company: details.manufacturingCompany,
          cid: details.latestMaintenanceCID
        });
      }
    }

    res.json(listedParts);
  } catch (err) {
    console.error('Marketplace Error:', err);
    res.status(500).json({ error: 'Failed to fetch marketplace listings' });
  }
});

router.post('/transfer', async (req, res) => {
  try {
    const { id, to } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Valid Part ID is required' });
    }
    if (!web3.utils.isAddress(to)) {
      return res.status(400).json({ error: 'Valid recipient address is required' });
    }

    const [account] = await web3.eth.getAccounts();

    const gasEstimate = await partRegistry.methods
      .transferOwnership(id, to)
      .estimateGas({ from: account });

    const tx = await partRegistry.methods
      .transferOwnership(id, to)
      .send({
        from: account,
        gas: Math.floor(gasEstimate * 1.2),
        gasPrice: await web3.eth.getGasPrice()
      });

    res.json({
      success: true,
      txHash: tx.transactionHash,
      blockNumber: tx.blockNumber
    });

  } catch (err) {
    console.error('Transfer Ownership Error:', err);
    res.status(400).json({ error: 'Blockchain transaction failed', details: err.message });
  }
});

// add a maintenance

router.post('/maintenance', async (req, res) => {
  try {
    const { id, description, maintenanceCID } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Valid Part ID is required' });
    }
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    if (!maintenanceCID) {
      return res.status(400).json({ error: 'Maintenance CID is required' });
    }

    const [account] = await web3.eth.getAccounts();

    const gasEstimate = await partRegistry.methods
      .addMaintenanceRecord(id, description, maintenanceCID)
      .estimateGas({ from: account });

    const tx = await partRegistry.methods
      .addMaintenanceRecord(id, description, maintenanceCID)
      .send({
        from: account,
        gas: Math.floor(gasEstimate * 1.2),
        gasPrice: await web3.eth.getGasPrice()
      });

    res.json({
      success: true,
      txHash: tx.transactionHash,
      blockNumber: tx.blockNumber
    });

  } catch (err) {
    console.error('Add Maintenance Error:', err);
    res.status(400).json({ error: 'Blockchain transaction failed', details: err.message });
  }
});

router.get('/owner/:name', async (req, res) => {
  try {
    const { name } = req.params;
    // console.log(ownerName);
    // Get part IDs
    const rawPartIds = await partRegistry.methods.getPartsByOwner(name).call();
    if (!rawPartIds.length) return res.status(404).json({ error: 'No parts found' });

    // Fetch detailed part information
    const parts = await Promise.all(
      rawPartIds.map(async (id) => {
        const partDetails = await partRegistry.methods.getPartDetails(id).call();
        
        // Get full maintenance history
        const maintenanceCount = await partRegistry.methods
          .getMaintenanceHistoryCount(id)
          .call();
        
        const maintenanceHistory = [];
        for (let i = 0; i < maintenanceCount; i++) {
          const record = await partRegistry.methods
            .getMaintenanceRecord(id, i)
            .call();
          maintenanceHistory.push({
            timestamp: record.timestamp,
            description: record.description,
            cid: record.maintenanceCID
          });
        }

        return {
          ...partDetails,
          maintenanceHistory,
          initialMaintenanceCID: maintenanceHistory[0]?.cid || '',
          initialDescription: maintenanceHistory[0]?.description || ''
        };
      })
    );

    res.json(parts);
  } catch (err) {
    console.error('Error fetching parts by owner:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});



// Fetch parts by manufacturing company
router.get('/company/:companyName', async (req, res) => {
  try {
    const { companyName } = req.params;

    if (!companyName) {
      return res.status(400).json({ error: 'Valid manufacturing company name required' });
    }

    // Call the smart contract's function to get parts by manufacturing company
    const parts = await partRegistry.methods.getPartsByManufacturingCompany(companyName).call();

    res.json({ parts });
  } catch (err) {
    console.error('Fetch Parts by Company Error:', err);
    res.status(400).json({ error: 'Blockchain transaction failed', details: err.message });
  }
});


module.exports = router;
