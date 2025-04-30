import React, { useState } from 'react';
import axios from 'axios';

function UploadComponentsForm() {
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

            const manufacturingTimestamp = Math.floor(new Date(manufacturingDate).getTime() / 1000);

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
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">Mint Aerospace Part</h1>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Serial ID</label>
                        <input
                            type="text"
                            value={serialId}
                            onChange={(e) => setSerialId(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Part Description</label>
                        <input
                            type="text"
                            value={partDescription}
                            onChange={(e) => setPartDescription(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Manufacturing Date</label>
                        <input
                            type="date"
                            value={manufacturingDate}
                            onChange={(e) => setManufacturingDate(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Initial Maintenance Description</label>
                        <input
                            type="text"
                            value={initialDescription}
                            onChange={(e) => setInitialDescription(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Manufacturing Company</label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Owner Company Name</label>
                        <input
                            type="text"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Maintenance File</label>
                        <input
                            type="file"
                            onChange={(e) => setMaintenanceFile(e.target.files[0])}
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                    </div>

                    <button
                        onClick={handleMint}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Mint Part
                    </button>

                    {status && (
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-md text-sm mt-4 whitespace-pre-line">
                            {status.split('\n').map((line, i) => (
                                <p key={i}>{line.trim()}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UploadComponentsForm;
