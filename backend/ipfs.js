// backend/ipfs.js

require('dotenv').config();
const pinataSDK = require('@pinata/sdk');
const { Readable } = require('stream');

// Convert Buffer to Readable Stream
function bufferToStream(buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // End of stream
    return stream;
}

// Initialize Pinata instance
const pinata = new pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_API_KEY
);

// Test Pinata credentials
pinata.testAuthentication()
    .then(() => {
        console.log('✅ Pinata authentication successful');
    })
    .catch((err) => {
        console.error('❌ Pinata authentication failed:', err.message || err);
        process.exit(1); // Important: Exit if Pinata not authenticated
    });

// Pin a file buffer to IPFS
async function pinFile(buffer) {
    if (!Buffer.isBuffer(buffer)) {
        throw new Error('pinFile requires a Buffer');
    }

    const stream = bufferToStream(buffer);
    const result = await pinata.pinFileToIPFS(stream, {
        pinataMetadata: {
            name: `File-${Date.now()}`,
            keyvalues: { type: 'file' }
        }
    });
    return result.IpfsHash;
}

// Pin a JSON object to IPFS
async function pinJSON(jsonData) {
    if (typeof jsonData !== 'object' || Array.isArray(jsonData) || jsonData === null) {
        throw new Error('pinJSON requires a valid JSON object');
    }

    const result = await pinata.pinJSONToIPFS(jsonData, {
        pinataMetadata: {
            name: `Data-${Date.now()}`,
            keyvalues: { type: 'json' }
        }
    });
    return result.IpfsHash;
}

// Export functions
module.exports = { pinFile, pinJSON };
