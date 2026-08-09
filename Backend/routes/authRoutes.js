const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;