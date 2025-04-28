import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Mint a new part
export async function mintPart(network, id, maintenance, certificate) {
  const resp = await axios.post(`${API}/api/parts/mint/${network}`, {
    id,
    maintenance,
    certificate
  });
  return resp.data;
}

// List a part for sale
export async function listPart(network, id, price) {
  const resp = await axios.post(`${API}/api/parts/list/${network}`, {
    id,
    price
  });
  return resp.data;
}

// Unlist a part from marketplace
export async function unlistPart(network, id) {
  const resp = await axios.post(`${API}/api/parts/unlist/${network}`, {
    id
  });
  return resp.data;
}

// Purchase a listed part
export async function purchasePart(network, id, buyerAddress) {
  const resp = await axios.post(`${API}/api/parts/purchase/${network}`, {
    id,
    buyer: buyerAddress
  });
  return resp.data;
}

// Transfer a part manually (admin / special cases)
export async function transferPart(network, id, toAddress) {
  const resp = await axios.post(`${API}/api/parts/transfer/${network}`, {
    id,
    to: toAddress
  });
  return resp.data;
}

// Get part details
export async function getPartDetails(network, id) {
  const resp = await axios.get(`${API}/api/parts/${network}/${id}`);
  return resp.data;
}

// Get all listed parts on marketplace
export async function getAllListedParts(network) {
  const resp = await axios.get(`${API}/api/parts/listed/${network}`);
  return resp.data;
}

// (Optional) Get all parts owned by a user
export async function getPartsByOwner(network, ownerAddress) {
  const resp = await axios.get(`${API}/api/parts/owner/${network}/${ownerAddress}`);
  return resp.data;
}
