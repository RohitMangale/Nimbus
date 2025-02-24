const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, roleMiddleware("admin"), (req, res) => {
    res.json({ message: "Inventory item added by admin" });
});

router.get("/view", authMiddleware, roleMiddleware("user"), (req, res) => {
    res.json({ message: "User viewing inventory" });
});

module.exports = router;
