const express = require("express");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const {
    getAllEmployees,
    getUserById,
    updateUser,
    deleteUser,
    createEmployee,
    updatePassword,
    // createEmployee,
} = require("../controllers/userController");

const router = express.Router();

// Only "admin" can manage users in this example
router.get("/", authenticate, getAllEmployees);  // works
router.get("/:id", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getUserById); // works
router.put("/updateUser/:id", authenticate, updateUser); // works
router.put("/updatePassword/:id", authenticate, updatePassword); // works
router.delete("/:id", authenticate, authorizeRole(["admin"]), deleteUser); 
router.post("/createEmployee/:id", authenticate, createEmployee); 

module.exports = router;
