const express = require("express");
const multer = require("multer");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById,
    updateInventoryItem,
    deleteInventoryItem,
    bulkImportInventoryItems, // Import new bulk import function
} = require("../controllers/inventoryController");

const router = express.Router();

// Multer setup (store file in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE
router.post("/", authenticate, authorizeRole(["admin", "manager"]), createInventoryItem);

// Bulk Import (Excel Upload)
router.post("/bulk", authenticate, authorizeRole(["admin", "manager","technician","staff"]), upload.single("file"), bulkImportInventoryItems);

// READ all
router.get("/", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getAllInventoryItems);

// READ single
router.get("/:id", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getInventoryItemById);

// UPDATE
router.put("/:id", authenticate, authorizeRole(["admin", "manager"]), updateInventoryItem);

// DELETE
router.delete("/:id", authenticate, authorizeRole(["admin", "manager"]), deleteInventoryItem);

module.exports = router;
