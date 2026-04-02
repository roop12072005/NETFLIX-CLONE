const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const db = require("./db");
const app = express();
app.use(cors()); // This is important for React!
app.use(express.json());



app.get('/data', (req, res) => {
  db.query('SELECT * FROM config', (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});