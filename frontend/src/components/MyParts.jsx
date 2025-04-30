
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane } from "lucide-react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyParts = () => {

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold mb-6">Get Parts by Owner</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {status && (
                <div className="p-3 bg-gray-100 rounded break-words mt-4 text-sm">
                    {status}
                </div>
            )}
                {parts.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Parts Owned by {ownerName}</h2>
                        {parts.map((part, index) => (
  <Card key={index} className="w-full hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center gap-4">
      <div className="p-2 bg-blue-100 rounded-full">
        <Plane className="h-6 w-6 text-blue-700" />
      </div>
      <div>
        <CardTitle className="text-xl font-semibold">Serial ID: {part.serialId}</CardTitle>
        <p className="text-sm text-gray-500">Manufactured by {part.manufacturingCompany}</p>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid gap-2 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <span className="text-gray-500">Description:</span>
          <span className="font-medium">{part.partDescription}</span>

          <span className="text-gray-500">Manufacturing Date:</span>
          <span className="font-medium">
            {new Date(part.manufacturingDate * 1000).toLocaleDateString()}
          </span>

          <span className="text-gray-500">Initial Description:</span>
          <span className="font-medium">{part.initialDescription}</span>

          <span className="text-gray-500">Sale Status:</span>
          <span className="font-medium">{part.forSale ? 'Listed' : 'Not Listed'}</span>
        </div>

        <div className="pt-2">
          <span className="text-gray-500">Maintenance CID:</span>
          {part.initialMaintenanceCID ? (
            <a
              href={`https://gateway.pinata.cloud/ipfs/${part.initialMaintenanceCID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline"
            >
              {part.initialMaintenanceCID}
            </a>
          ) : (
            <span className="text-gray-400 ml-2">No CID available</span>
          )}
        </div>

        <div className="pt-4 space-y-2">
          <button
            onClick={() => handleToggleSale(part.serialId, part.forSale)}
            className={`w-full py-2 px-4 rounded text-white transition-colors ${
              part.forSale ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
            disabled={status.includes('Processing')}
          >
            {part.forSale ? 'Unlist from Sale' : 'List for Sale'}
          </button>

          {/* Show price input + confirm only if part is being listed now */}
          {!part.forSale && listingInfo.serialId === part.serialId && (
            <div className="space-y-2">
              <input
                type="number"
                min="0"
                placeholder="Enter Price"
                value={listingInfo.price}
                onChange={(e) =>
                  setListingInfo({
                    ...listingInfo,
                    price: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() =>
                  processSaleToggle(part.serialId, false, listingInfo.price)
                }
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                disabled={!listingInfo.price}
              >
                Confirm Listing
              </button>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
))}

                    </div>
                )}
    </div>
      </main>
    </div>
  );
};

export default MyParts;
