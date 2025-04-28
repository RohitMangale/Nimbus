require('dotenv').config();
const pinataSDK = require('@pinata/sdk');
const { Readable } = require('stream');

function bufferToStream(buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Signals end of stream
    return stream;
}

// Initialize Pinata
const pinata = new pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_API_KEY
);

// Verify credentials on startup
pinata.testAuthentication().then(() => {
    console.log('✅ Pinata authentication successful');
}).catch(err => {
    console.error('❌ Pinata authentication failed:', err);
});

async function pinFile(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('pinFile requires a Buffer');
    }
    
    const stream = Readable.from(buffer);
    const result = await pinata.pinFileToIPFS(stream, {
      pinataMetadata: {
        name: `File-${Date.now()}`,
        keyvalues: { type: 'file' }
      }
    });
    return result.IpfsHash;
}

// Add similar logging for pinJSON
async function pinJSON(jsonData) {
    if (typeof jsonData !== 'object') {
      throw new Error('pinJSON requires a JSON object');
    }
    
    const result = await pinata.pinJSONToIPFS(jsonData, {
      pinataMetadata: {
        name: `Data-${Date.now()}`,
        keyvalues: { type: 'json' }
      }
    });
    return result.IpfsHash;
}

module.exports = { pinFile, pinJSON };