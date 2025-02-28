const express = require("express");
const { createItem } = require("../controllers/itemController");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, authorizeRole(["admin", "manager"]), createItem);

module.exports = router;
