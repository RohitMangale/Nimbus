const express = require("express");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();

// CREATE
router.post("/", authenticate, authorizeRole(["admin", "manager"]), createCategory); // works

// READ all
router.get("/", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getAllCategories); // works

// READ single
router.get("/:id", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getCategoryById);  // works

// UPDATE
router.put("/:id", authenticate, authorizeRole(["admin", "manager"]), updateCategory);

// DELETE
router.delete("/:id", authenticate, authorizeRole(["admin", "manager"]), deleteCategory);

module.exports = router;
