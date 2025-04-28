const express = require("express");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const {
    createMaintenance,
    getAllMaintenance,
    getMaintenanceById,
    createTemplate,
    updateMaintenance,
    deleteMaintenance,
    getAllTemplates,
    getTemplatesById,

} = require("../controllers/maintenanceController");

const router = express.Router();

/**
 * @route   POST /maintenance
 * @desc    Create a new maintenance record
 * @access  admin, manager, technician
 */
router.post("/", authenticate, authorizeRole(["admin", "manager", "technician"]), createMaintenance);
router.post("/template/create", authenticate, createTemplate);

/**
 * @route   GET /maintenance
 * @desc    Get all maintenance records
 * @access  admin, manager, technician, staff
 */
router.get("/", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getAllMaintenance);
router.get("/templates", authenticate, getAllTemplates);
router.get("/template/:id", authenticate, getTemplatesById);

/**
 * @route   GET /maintenance/:id
 * @desc    Get a single maintenance record by ID
 * @access  admin, manager, technician, staff
 */
router.get("/:id", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getMaintenanceById);

/**
 * @route   PUT /maintenance/:id
 * @desc    Update a maintenance record
 * @access  admin, manager, technician
 */
router.put("/:id", authenticate, authorizeRole(["admin", "manager", "technician"]), updateMaintenance);

/**
 * @route   DELETE /maintenance/:id
 * @desc    Delete a maintenance record
 * @access  admin, manager
 */
router.delete("/:id", authenticate, authorizeRole(["admin", "manager"]), deleteMaintenance);

module.exports = router;
