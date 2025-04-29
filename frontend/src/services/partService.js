import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Create (mint) a new part
export async function createPart(serialId, partDescription, manufacturingCompany, manufacturingDate, initialMaintenanceCID, initialDescription) {
  const resp = await axios.post(`${API}/api/parts/create`, {
    owner,
    serialId,
    partDescription,
    manufacturingCompany,
    manufacturingDate,
    initialMaintenanceCID,
    initialDescription
  });
  return resp.data;
}

// List a part for sale
export async function listPart(id, price) {
  const resp = await axios.post(`${API}/api/parts/list`, { id, price });
  return resp.data;
}

// Unlist a part from marketplace
export async function unlistPart(id) {
  const resp = await axios.post(`${API}/api/parts/unlist`, { id });
  return resp.data;
}

// Transfer a part to another address
export async function transferPart(id, toAddress) {
  const resp = await axios.post(`${API}/api/parts/transfer`, {
    id,
    to: toAddress
  });
  return resp.data;
}

// Add maintenance record
export async function addMaintenanceRecord(id, description, maintenanceCID) {
  const resp = await axios.post(`${API}/api/parts/maintenance`, {
    id,
    description,
    maintenanceCID
  });
  return resp.data;
}

// Get part details
export async function getPartDetails(id) {
  const resp = await axios.get(`${API}/api/parts/${id}`);
  return resp.data;
}

// Get all listed parts
export async function getAllListedParts() {
  const resp = await axios.get(`${API}/api/parts/listed`);
  return resp.data;
}

// Get parts owned by a user
export async function getPartsByOwner(ownerName) {
  const resp = await axios.get(`${API}/api/parts/owner/${ownerName}`);
  return resp.data;
}  

// Get parts by manufacturing company
export async function getPartsByCompany(companyName) {
  const resp = await axios.get(`${API}/api/parts/company/${companyName}`);
  return resp.data;
}
