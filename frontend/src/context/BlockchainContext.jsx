// frontend/src/context/BlockchainContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import PartRegistryABI from '../abis/PartRegistry.json'; // Make sure path is correct
import { PARTNETWORK_CONTRACT_ADDR } from '../config'; // Or hardcode directly
import axios from 'axios';

const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initBlockchain = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' }); // Better way
          const accounts = await web3Instance.eth.getAccounts();
          const partRegistryContract = new web3Instance.eth.Contract(
            PartRegistryABI,
            PARTNETWORK_CONTRACT_ADDR
          );

          setWeb3(web3Instance);
          setAccount(accounts[0]);
          setContract(partRegistryContract);

          // Listen for account changes (optional but good)
          window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0] || '');
          });

          // Listen for network changes (optional but good)
          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });

        } catch (error) {
          console.error('❌ Error connecting to MetaMask:', error.message || error);
        }
      } else {
        console.error('❌ MetaMask not detected');
      }
      setIsInitialized(true);
    };

    initBlockchain();
  }, []);

  // Contract Functions

  const createPart = async (serialId, partDescription, manufacturingCompany, manufacturingDate, maintenanceCID, maintenanceDescription) => {
    if (!contract) throw new Error('Contract not initialized');
    try {
      const tx = await contract.methods.createPart(
        serialId,
        partDescription,
        manufacturingCompany,
        manufacturingDate,
        maintenanceCID,
        maintenanceDescription
      ).send({ from: account });
      return tx;
    } catch (error) {
      console.error('❌ Error creating part:', error.message || error);
      throw error;
    }
  };

  const transferOwnership = async (partId, newOwnerAddress) => {
    if (!contract) throw new Error('Contract not initialized');
    try {
      const tx = await contract.methods.transferOwnership(
        partId,
        newOwnerAddress
      ).send({ from: account });
      return tx;
    } catch (error) {
      console.error('❌ Error transferring ownership:', error.message || error);
      throw error;
    }
  };

  const addMaintenanceRecord = async (partId, description, maintenanceCID) => {
    if (!contract) throw new Error('Contract not initialized');
    try {
      const tx = await contract.methods.addMaintenanceRecord(
        partId,
        description,
        maintenanceCID
      ).send({ from: account });
      return tx;
    } catch (error) {
      console.error('❌ Error adding maintenance record:', error.message || error);
      throw error;
    }
  };

  const getPartDetails = async (partId) => {
    try {
      const response = await axios.get(`/api/parts/${partId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching part details:', error.message || error);
      throw error;
    }
  };

  return (
    <BlockchainContext.Provider
      value={{
        web3,
        account,
        contract,
        isInitialized,
        createPart,
        transferOwnership,
        addMaintenanceRecord,
        getPartDetails
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => useContext(BlockchainContext);
