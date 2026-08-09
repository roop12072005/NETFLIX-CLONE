require("dotenv").config();

const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");
const tvShowsRoutes = require("./routes/tvShowsRoutes");
const authRoutes = require("./routes/authRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/tvshows", tvShowsRoutes)
app.use("/api/watchlist", watchlistRoutes);

async function testDB() {
  try{
    await db.query("SELECT 1");
    console.log("DATABASE CONNECTED")
  }catch (err){
    console.log(err);
  }
}

testDB();

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});