
import PartsCard from "./PartsCard";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PartsMarketplace = () => {
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
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Aircraft Parts Inventory</h1>
          <p className="mt-2 text-gray-600">Manage and track aircraft parts inventory</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {status && (
                <div className="p-3 bg-gray-100 rounded break-words mt-4 text-sm">
                    {status}
                </div>
            )}
      {listings.map((part, index) => (
        <PartsCard key={index} part={part} />
      ))}
                  {listings.length === 0 && !status && (
                <div className="text-center py-8 text-gray-500">
                    No parts currently listed for sale
                </div>
            )}
    </div>
      </main>
    </div>
  );
};

export default PartsMarketplace;
