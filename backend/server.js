require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const testRoutes = require("./routes/testRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
app.use(cors());
app.use(express.json());

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
