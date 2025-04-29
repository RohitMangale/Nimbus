import React, { useState } from 'react';
import axios from 'axios';

function PartsByOwner() {
    const [ownerName, setOwnerName] = useState('');
    const [parts, setParts] = useState([]);
    const [status, setStatus] = useState('');
    const [listingInfo, setListingInfo] = useState({}); // Track which part is being listed and its price

    const fetchPartsByOwner = async () => {
        try {
            if (!ownerName) {
                setStatus('⚠️ Please enter a valid owner name.');
                return;
            }

            setStatus('⏳ Fetching parts...');
            const response = await axios.get(
                `http://localhost:5000/api/parts/owner/${ownerName}`
            );
            setParts(response.data);
            setStatus('');
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            setStatus(`❌ Error: ${errorMessage}`);
            console.error('❌ Error fetching parts:', error);
        }
    };

    const handleToggleSale = (serialId, isCurrentlyListed) => {
        if (!isCurrentlyListed) {
            // Show price input
            setListingInfo({ serialId, price: '' });
        } else {
            // Unlist directly
            processSaleToggle(serialId, true);
        }
    };

    const processSaleToggle = async (serialId, isCurrentlyListed, price = null) => {
        try {
          setStatus('⏳ Processing...');
          const endpoint = isCurrentlyListed ? 'unlist' : 'list';
          
          // Remove userAddress from request
          const response = await axios.post(
            `http://localhost:5000/api/parts/${endpoint}`,
            { 
              serialId,
              price: price || "0" // Force string conversion
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
      
          if (response.data.success) {
            await fetchPartsByOwner();
            setStatus('✅ Success!');
          }
        } catch (error) {
          setStatus(`❌ Error: ${error.response?.data?.error || error.message}`);
        }
      };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Get Parts by Owner</h1>

            <div className="space-y-5 max-w-md">
                <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Enter Owner Name"
                    className="w-full p-2 border rounded"
                />

                <button
                    onClick={fetchPartsByOwner}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Get Parts
                </button>

                {status && (
                    <div className="p-3 bg-gray-100 rounded break-words mt-4 text-sm">
                        {status}
                    </div>
                )}

                {parts.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Parts Owned by {ownerName}</h2>
                        <ul className="space-y-3">
                            {parts.map((part, index) => (
                                <li key={index} className="p-4 border rounded shadow">
                                    <p><strong>Serial ID:</strong> {part.serialId}</p>
                                    <p><strong>Description:</strong> {part.partDescription}</p>
                                    <p><strong>Manufacturing Company:</strong> {part.manufacturingCompany}</p>
                                    <p><strong>Manufacturing Date:</strong> {new Date(part.manufacturingDate * 1000).toLocaleDateString()}</p>
                                    <p className="mt-2">
                                        <strong>Maintenance CID:</strong> 
                                        {part.initialMaintenanceCID ? (
                                            <a 
                                                href={`https://gateway.pinata.cloud/ipfs/${part.initialMaintenanceCID}`}
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {part.initialMaintenanceCID}
                                            </a>
                                        ) : (
                                            <span className="text-gray-500">No CID available</span>
                                        )}
                                    </p>
                                    <p><strong>Initial Description:</strong> {part.initialDescription}</p>

                                    {/* Sale Toggle Section */}
                                    <div className="mt-3 space-y-2">
                                        <p><strong>Sale Status:</strong> {part.forSale ? 'Listed' : 'Not Listed'}</p>

                                        <button 
                                            onClick={() => handleToggleSale(part.serialId, part.forSale)}
                                            className={`px-4 py-2 rounded ${
                                                part.forSale 
                                                    ? 'bg-red-500 hover:bg-red-600' 
                                                    : 'bg-green-500 hover:bg-green-600'
                                            } text-white transition-colors`}
                                            disabled={status.includes('Processing')}
                                        >
                                            {part.forSale ? 'Unlist from Sale' : 'List for Sale'}
                                        </button>

                                        {/* Show price input + confirm only if part is being listed now */}
                                        {!part.forSale && listingInfo.serialId === part.serialId && (
                                            <div className="space-y-2 mt-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    placeholder="Enter Price"
                                                    value={listingInfo.price}
                                                    onChange={(e) => setListingInfo({
                                                        ...listingInfo,
                                                        price: e.target.value
                                                    })}
                                                    className="w-full p-2 border rounded"
                                                />
                                                <button
                                                    onClick={() => processSaleToggle(part.serialId, false, listingInfo.price)}
                                                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                                    disabled={!listingInfo.price}
                                                >
                                                    Confirm Listing
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PartsByOwner;
