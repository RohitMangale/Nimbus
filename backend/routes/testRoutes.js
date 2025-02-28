const express = require("express");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const {
    createTest,
    getAllTests,
    getTestById,
    updateTest,
    deleteTest
} = require("../controllers/testController");

const router = express.Router();

// CREATE
router.post("/", authenticate, authorizeRole(["admin", "manager", "technician"]), createTest);

// READ all
router.get("/", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getAllTests);

// READ single
router.get("/:id", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getTestById);

// UPDATE
router.put("/:id", authenticate, authorizeRole(["admin", "manager", "technician"]), updateTest);

// DELETE
router.delete("/:id", authenticate, authorizeRole(["admin", "manager"]), deleteTest);

module.exports = router;
