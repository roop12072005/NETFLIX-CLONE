require("dotenv").config();

const cors = require("cors");
const express = require("express");
const movieRoutes = require("./routes/movieRoutes");
const tvShowsRoutes = require("./routes/tvShowsRoutes")
console.log(tvShowsRoutes)
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/movies", movieRoutes);
app.use("/api/tvshows", tvShowsRoutes)
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});