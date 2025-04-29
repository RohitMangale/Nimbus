require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const { pinFile, pinJSON } = require('./ipfs');   // fixed

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

// Attach routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/tests", testRoutes);
app.use("/maintenance", maintenanceRoutes);
app.use("/reports", reportRoutes);
app.use("/api/parts", partsRouter);

// IPFS Upload Endpoints
app.post('/api/ipfs/upload-file', upload.single('file'), async (req, res) => {
    try {
      const ipfsHash = await pinFile(req.file.buffer);
      res.json({ IpfsHash: ipfsHash });
    } catch (error) {
      res.status(500).json({ error: 'File upload failed' });
    }
});

app.post('/api/ipfs/upload-json', async (req, res) => {
    try {
      const ipfsHash = await pinJSON(req.body);
      res.json({ IpfsHash: ipfsHash });
    } catch (error) {
      res.status(500).json({ error: 'JSON upload failed' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
