const express = require("express");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById,
    updateInventoryItem,
    deleteInventoryItem
} = require("../controllers/inventoryController");

const router = express.Router();

// CREATE
router.post("/", authenticate, authorizeRole(["admin", "manager"]), createInventoryItem);

// READ all
router.get("/", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getAllInventoryItems);

// READ single
router.get("/:id", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getInventoryItemById);

// UPDATE
router.put("/:id", authenticate, authorizeRole(["admin", "manager"]), updateInventoryItem);

// DELETE
router.delete("/:id", authenticate, authorizeRole(["admin", "manager"]), deleteInventoryItem);

module.exports = router;
