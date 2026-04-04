

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();

app.use(cors()); // This is important for React!
app.use(express.json());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'netflix_clone', // or 'countdown_db'
  port: 3307  // <--- ADD THIS LINE
});




app.get('/data', (req, res) => {
  db.query('SELECT * FROM config', (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "All fields required" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    if (result.length > 0) {
      res.json({
        success: true,
        user: result[0]
      });
    } else {
      res.json({
        success: false,
        message: "Invalid email or password"
      });
    }
  });
});
app.get("/movies", (req, res) => {
  const query = "SELECT * FROM movies";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.json([]);
    }

    res.json(result);
  });
});