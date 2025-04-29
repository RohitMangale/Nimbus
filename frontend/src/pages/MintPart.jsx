import React, { useState } from 'react';
import axios from 'axios';

function MintPart() {
    const [serialId, setSerialId] = useState('');
    const [partDescription, setPartDescription] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [initialDescription, setInitialDescription] = useState('');
    const [maintenanceFile, setMaintenanceFile] = useState(null);
    const [company, setCompany] = useState('');
    const [owner, setOwner] = useState('');
    const [status, setStatus] = useState('');

    const uploadToIPFS = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(
                'http://localhost:5000/api/ipfs/upload-file',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            return response.data.IpfsHash;
        } catch (error) {
            console.error('❌ Upload error:', error);
            throw error;
        }
    };

    const handleMint = async () => {
        try {
            if (!serialId || !partDescription || !manufacturingDate || !initialDescription || !maintenanceFile || !company || !owner) {
                setStatus('⚠️ Please fill all fields and upload the maintenance file.');
                return;
            }

            setStatus('⏳ Uploading maintenance file to IPFS...');

            const maintenanceCID = await uploadToIPFS(maintenanceFile);

            if (!maintenanceCID.startsWith('Qm')) {
                throw new Error('Invalid file upload - IPFS returned unexpected hash.');
            }

            setStatus('⏳ Minting part on blockchain...');

            const manufacturingTimestamp = Math.floor(new Date(manufacturingDate).getTime() / 1000); // Converts date to timestamp

            const result = await axios.post(
                `http://localhost:5000/api/parts/create`,
                {
                    owner,
                    serialId,
                    partDescription,
                    manufacturingCompany: company,
                    manufacturingDate: manufacturingTimestamp,
                    initialMaintenanceCID: maintenanceCID,
                    initialDescription
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            setStatus(`✅ Successfully minted part!\n
                TX Hash: ${result.data.txHash}\n
                Maintenance CID: ${maintenanceCID}`);

            // Reset fields
            setOwner('');
            setSerialId('');
            setPartDescription('');
            setManufacturingDate('');
            setInitialDescription('');
            setMaintenanceFile(null);
            setCompany('');
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            setStatus(`❌ Error: ${errorMessage}`);
            console.error('❌ Minting Error:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Mint Aerospace Part</h1>

            <div className="space-y-5 max-w-md">
                <input
                    type="text"
                    value={serialId}
                    onChange={(e) => setSerialId(e.target.value)}
                    placeholder="Serial ID"
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    value={partDescription}
                    onChange={(e) => setPartDescription(e.target.value)}
                    placeholder="Part Description"
                    className="w-full p-2 border rounded"
                />

                <input
                    type="date"
                    value={manufacturingDate}
                    onChange={(e) => setManufacturingDate(e.target.value)}
                    placeholder="Manufacturing Date"
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    value={initialDescription}
                    onChange={(e) => setInitialDescription(e.target.value)}
                    placeholder="Initial Maintenance Description"
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Manufacturing Company"
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="Owner Company Name"
                    className="w-full p-2 border rounded"
                />

                <div>
                    <label className="block font-medium mb-1">
                        Upload Maintenance File:
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setMaintenanceFile(e.target.files[0])}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    onClick={handleMint}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Mint Part
                </button>

                {status && (
                    <div className="p-3 bg-gray-100 rounded break-words mt-4 text-sm">
                        {status.split('\n').map((line, i) => (
                            <p key={i}>{line.trim()}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MintPart;
