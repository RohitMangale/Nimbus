import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';

const defaultContext = {
  account: '',
  createPart: async () => {},
  getPartDetails: async () => {}
}

const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initBlockchain = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();
          const accounts = await web3Instance.eth.getAccounts();
          setWeb3(web3Instance);
          setAccount(accounts[0]);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      }
      setIsInitialized(true)
    };
    initBlockchain();
  }, []);

  const createPart = async (partData) => {
    if (!contract) {
      throw new Error('Contract not initialized')
    }
    try {
      const response = await axios.post('/api/parts/create', {
        account,
        partData
      });
      return response.data;
    } catch (error) {
      console.error('Error creating part:', error);
      throw error;
    }
  };

  const getPartDetails = async (partId) => {
    try {
      const response = await axios.get(`/api/parts/${partId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching part details:', error);
      throw error;
    }
  };

  return (
    <BlockchainContext.Provider value={{ account, createPart, getPartDetails, isInitialized }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => useContext(BlockchainContext);