const express = require("express");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const router = express.Router();

// Only "admin" can manage users in this example
router.get("/", authenticate, authorizeRole(["admin"]), getAllUsers);  // works
router.get("/:id", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getUserById); // works
router.put("/:id", authenticate, authorizeRole(["admin"]), updateUser); // works
router.delete("/:id", authenticate, authorizeRole(["admin"]), deleteUser); 

module.exports = router;
