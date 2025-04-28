import React, { useState } from 'react';
import axios from 'axios';

function MintPart() {
    const [id, setId] = useState('');
    const [maintenanceFile, setMaintenanceFile] = useState(null);
    const [certificateFile, setCertificateFile] = useState(null);
    const [company, setCompany] = useState('A');
    const [status, setStatus] = useState('');

    // Unified upload function with proper FormData handling
    const uploadToIPFS = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Correct endpoint URL
            const response = await axios.post(
                'http://localhost:5000/api/ipfs/upload-file',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            return response.data.IpfsHash;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    // Improved mint handler with proper CID handling
    const handleMint = async () => {
        try {
            if (!maintenanceFile || !certificateFile || !id) {
                setStatus('Please fill all fields and upload files.');
                return;
            }
    
            setStatus('Uploading files to IPFS...');
            
            // Convert ID to number
            const numericId = Number(id);
            if (isNaN(numericId)) {
                throw new Error('Part ID must be a number');
            }
            
            // Upload files
            const [maintenanceCID, certificateCID] = await Promise.all([
                uploadToIPFS(maintenanceFile),
                uploadToIPFS(certificateFile)
            ]);
    
            // Validate CIDs before proceeding
            if (!maintenanceCID.startsWith('Qm') || !certificateCID.startsWith('Qm')) {
                throw new Error('Invalid file upload - check IPFS responses');
            }
    
            setStatus('Minting part on blockchain...');
            
            const result = await axios.post(
                `http://localhost:5000/api/parts/mint/${company}`,
                {
                    id: numericId,  // Send as number
                    maintenanceCID,
                    certificateCID
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Debug': 'true' 
                    }
                }
            );
    
            setStatus(`Successfully minted part ${result.data.id}
                TX Hash: ${result.data.txHash}
                Maintenance CID: ${result.data.maintenanceCID}
                Certificate CID: ${result.data.certificateCID}`);
    
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            setStatus(`Error: ${errorMessage}`);
            console.error('Minting Error:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl mb-4">Mint Aerospace Part</h1>

            {/* Form Controls */}
            <div className="space-y-4 max-w-md">
                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Part ID"
                    className="w-full p-2 border rounded"
                />

                <div className="space-y-2">
                    <label className="block font-medium">
                        Maintenance Documentation:
                        <input
                            type="file"
                            onChange={(e) => setMaintenanceFile(e.target.files[0])}
                            className="block w-full mt-1 p-1 border rounded"
                        />
                    </label>

                    <label className="block font-medium">
                        Certification Document:
                        <input
                            type="file"
                            onChange={(e) => setCertificateFile(e.target.files[0])}
                            className="block w-full mt-1 p-1 border rounded"
                        />
                    </label>
                </div>

                <div className="flex items-center gap-2">
                    <label className="font-medium">Company:</label>
                    <select
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="A">Company A</option>
                        <option value="B">Company B</option>
                    </select>
                </div>

                <button 
                    onClick={handleMint}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Mint Part on Company {company}
                </button>

                {status && (
                    <div className="p-3 bg-gray-100 rounded break-words">
                        {status.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MintPart;