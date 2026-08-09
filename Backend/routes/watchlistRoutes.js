const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { addMovie, getWatchlist, deleteMovie} = require("../controllers/watchlistController");

router.post("/", protect, addMovie);
router.get("/", protect, getWatchlist);
router.delete("/", protect, deleteMovie);

module.exports = router;