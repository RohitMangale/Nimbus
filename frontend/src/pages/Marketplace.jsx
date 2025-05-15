import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Marketplace() {
    const [listings, setListings] = useState([]);
    const [status, setStatus] = useState('');
    useEffect(() => {
        fetchMarketplace();
    }, []);

    const fetchMarketplace = async () => {
        try {
            setStatus('⏳ Loading marketplace...');
            const response = await axios.get('http://localhost:5000/api/parts/marketplace');
            setListings(response.data);
            setStatus('');
        } catch (error) {
            setStatus(`❌ Error: ${error.response?.data?.error || error.message}`);
        }
    };
    const handlePurchase = async (serialId, currentOwner) => {
  try {
    // Validate parameters before proceeding
    if (!serialId || !currentOwner) {
      setStatus('❌ Missing required part information');
      return;
    }

    const newOwner = prompt('Enter new owner name:');
    if (!newOwner) return;

    // Immediate client-side validation
    if (newOwner.trim().toLowerCase() === currentOwner.trim().toLowerCase()) {
      setStatus('❌ Part already belongs to this owner');
      return;
    }

    setStatus('⏳ Processing transfer...');
    
    const response = await axios.post('http://localhost:5000/api/parts/transfer', {
      serialId,
      currentOwner: currentOwner.trim(),
      newOwner: newOwner.trim()
    });

    setStatus(`✅ Transferred to ${response.data.newOwner}!`);
    setTimeout(fetchMarketplace, 2000);

  } catch (error) {
    const errorMsg = error.response?.data?.error || error.message;
    setStatus(`❌ Error: ${errorMsg}`);
  }
};

    return (
        <div className="p-6">
            {/* <h1 className="text-2xl font-bold mb-6">Aircraft Parts Marketplace</h1> */}

            {status && (
                <div className="p-3 bg-gray-100 rounded break-words mt-4 text-sm">
                    {status}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {listings.map((part, index) => (
                    <div key={index} className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">{part.serialId}</h3>
                            <p className="text-gray-600">{part.description}</p>
                            
                            <div className="flex justify-between items-center">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    {part.company}
                                </span>
                                <span className="text-green-600 font-bold">
                                    ${part.price} ETH
                                </span>
                            </div>

                            {part.cid && (
                                <a
                                    href={`https://gateway.pinata.cloud/ipfs/${part.cid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-blue-600 hover:underline"
                                >
                                    View Maintenance Records
                                </a>
                            )}

                            <div className="pt-4 space-y-2">
                                <button 
                                    className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                    onClick={() => handlePurchase(part.serialId, part?.owner || '')}
                                >
                                    Purchase Part
                                </button>
                                <p className="text-sm text-gray-500">
                                    Sold by: {part.owner}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {listings.length === 0 && !status && (
                <div className="text-center py-8 text-gray-500">
                    No parts currently listed for sale
                </div>
            )}
        </div>
    );
}

export default Marketplace;