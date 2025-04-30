import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PartsByOwner() {
    const user = localStorage.getItem('user');
    const name = user ? JSON.parse(user).name : null;
    const [ownerName, setOwnerName] = useState(name);
    const [parts, setParts] = useState([]);
    const [status, setStatus] = useState('');
    const [listingInfo, setListingInfo] = useState({});

    useEffect(() => {
        fetchPartsByOwner();
    }, []);

    const fetchPartsByOwner = async () => {
        try {
            if (!ownerName) {
                setStatus('⚠️ Please enter a valid owner name.');
                return;
            }

            setStatus('⏳ Fetching parts...');
            const response = await axios.get(`http://localhost:5000/api/parts/owner/${ownerName}`);
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
            setListingInfo({ serialId, price: '' });
        } else {
            processSaleToggle(serialId, true);
        }
    };

    const processSaleToggle = async (serialId, isCurrentlyListed, price = null) => {
        try {
            setStatus('⏳ Processing...');
            const endpoint = isCurrentlyListed ? 'unlist' : 'list';

            const response = await axios.post(
                `http://localhost:5000/api/parts/${endpoint}`,
                {
                    serialId,
                    price: price || "0"
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
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">🛠️ Parts Owned by {ownerName}</h1>

            {status && (
                <div className="mb-4 p-4 bg-gray-100 text-gray-800 rounded shadow text-sm">
                    {status}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {parts.map((part, index) => (
                    <div key={index} className="p-5 border rounded-lg shadow bg-white space-y-3">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-700">🔢 {part.serialId}</h2>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                part.forSale ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                            }`}>
                                {part.forSale ? 'Listed' : 'Not Listed'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600"><strong>Description:</strong> {part.partDescription}</p>
                        <p className="text-sm text-gray-600"><strong>Manufacturer:</strong> {part.manufacturingCompany}</p>
                        <p className="text-sm text-gray-600"><strong>Manufactured:</strong> {new Date(part.manufacturingDate * 1000).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">
                            <strong>Maintenance CID:</strong>{' '}
                            {part.initialMaintenanceCID ? (
                                <a
                                href={`https://gateway.pinata.cloud/ipfs/${part.initialMaintenanceCID}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline break-all block truncate"
                                title={part.initialMaintenanceCID}
                            >
                                {part.initialMaintenanceCID}
                            </a>
                            ) : (
                                <span className="text-gray-400">No CID</span>
                            )}
                        </p>
                        <p className="text-sm text-gray-600"><strong>Initial Description:</strong> {part.initialDescription}</p>

                        {/* Listing section */}
                        <div className="mt-4 space-y-2">
                            <button
                                onClick={() => handleToggleSale(part.serialId, part.forSale)}
                                className={`w-full py-2 text-white rounded transition-colors ${
                                    part.forSale ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
                                }`}
                                disabled={status.includes('Processing')}
                            >
                                {part.forSale ? 'Unlist from Sale' : 'List for Sale'}
                            </button>

                            {!part.forSale && listingInfo.serialId === part.serialId && (
                                <div className="space-y-2">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="Enter Price"
                                        value={listingInfo.price}
                                        onChange={(e) => setListingInfo({ ...listingInfo, price: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <button
                                        onClick={() => processSaleToggle(part.serialId, false, listingInfo.price)}
                                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                                        disabled={!listingInfo.price}
                                    >
                                        Confirm Listing
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PartsByOwner;
