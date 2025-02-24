const express = require("express");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport
} = require("../controllers/reportController");

const router = express.Router();

/**
 * CREATE (POST /reports)
 * Body: { report_type: "test" or "maintenance", reference_id, report_file_url, ... }
 */
router.post("/", authenticate, authorizeRole(["admin", "manager", "technician"]), createReport);

/**
 * READ all (GET /reports?report_type=test or maintenance)
 */
router.get("/", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getAllReports);

/**
 * READ single (GET /reports/:report_type/:id)
 */
router.get("/:report_type/:id", authenticate, authorizeRole(["admin", "manager", "technician", "staff"]), getReportById);

/**
 * UPDATE (PUT /reports/:report_type/:id)
 */
router.put("/:report_type/:id", authenticate, authorizeRole(["admin", "manager", "technician"]), updateReport);

/**
 * DELETE (DELETE /reports/:report_type/:id)
 */
router.delete("/:report_type/:id", authenticate, authorizeRole(["admin", "manager"]), deleteReport);

module.exports = router;
