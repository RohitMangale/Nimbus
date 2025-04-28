require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const { pinFile } = require('./ipfs');

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const testRoutes = require("./routes/testRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const reportRoutes = require("./routes/reportRoutes");
const partsRouter = require('./routes/parts');
const upload = multer();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/parts', partsRouter);
// const { web3, contract } = initWeb3();

// For file uploads
app.post('/api/ipfs/upload-file', upload.single('file'), async (req, res) => {
    try {
      const ipfsHash = await pinFile(req.file.buffer);
      res.json({ IpfsHash: ipfsHash });
    } catch (error) {
      res.status(500).json({ error: 'File upload failed' });
    }
});
  
  // For JSON data
app.post('/api/ipfs/upload-json', async (req, res) => {
    try {
      const ipfsHash = await pinJSON(req.body);
      res.json({ IpfsHash: ipfsHash });
    } catch (error) {
      res.status(500).json({ error: 'JSON upload failed' });
    }
});
// Auth (signup, login, etc.)
app.use("/auth", authRoutes);

// User Management (CRUD)
app.use("/users", userRoutes);

// Master Category (CRUD)
app.use("/categories", categoryRoutes);

// Inventory (CRUD for items)
app.use("/inventory", inventoryRoutes);

// Tests (CRUD)
app.use("/tests", testRoutes);

// Maintenance (CRUD)
app.use("/maintenance", maintenanceRoutes);

// Reports (CRUD)
app.use("/reports", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
