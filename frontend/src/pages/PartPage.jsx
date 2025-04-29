import React, { useState } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi'; // If using web3 authentication

const PartExplorer = () => {
  const [searchType, setSearchType] = useState('owner');
  const [searchInput, setSearchInput] = useState('');
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { address } = useAccount(); // Get connected wallet address

  const searchTypes = [
    { id: 'owner', label: 'By Owner' },
    { id: 'company', label: 'By Company' }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput) return;

    setLoading(true);
    setError('');
    
    try {
      const endpoint = searchType === 'owner' 
        ? `/api/parts/owner/${searchInput}`
        : `/api/parts/company/${encodeURIComponent(searchInput)}`;

      const response = await axios.get(endpoint);
      setParts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch parts');
      setParts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-4 mb-8">
        {searchTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSearchType(type.id)}
            className={`px-4 py-2 rounded-lg ${
              searchType === type.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={
            searchType === 'owner' 
              ? 'Enter owner address...' 
              : 'Enter company name...'
          }
          className="flex-1 p-3 border rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-4 mb-4 text-red-600 bg-red-100 rounded-lg">{error}</div>
      )}

      <div className="space-y-6">
        {parts.map((part, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">{part.serialId}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Owner:</span> {part.owner}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Description:</span> {part.partDescription}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Manufacturer:</span> {part.manufacturingCompany}
                </p>
              </div>
              
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Manufactured:</span> {formatDate(part.manufacturingDate)}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Status:</span> {part.forSale ? 'For Sale' : 'Not Listed'}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Maintenance Records:</span> {part.maintenanceCount}
                </p>
                <p className="text-gray-600">
                    <span className="font-semibold">Initial Maintenance:</span> 
                    <IPFSLink cid={part.initialMaintenanceCID} />
                 </p>
              </div>
            </div>

            {address === part.owner && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold mb-2">Owner Actions</h4>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                    Add Maintenance
                  </button>
                  <button className="px-4 py-2 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700">
                    {part.forSale ? 'Unlist' : 'List for Sale'}
                  </button>
                  <button className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                    Transfer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartExplorer;