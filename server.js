const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

// database connection
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to Railway MySQL");
  }
});

// booking API
app.post("/book", (req, res) => {

  const { checkin, checkout, room_type, guests, mobile } = req.body;

  const sql = "INSERT INTO bookings (checkin, checkout, room_type, guests, mobile) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [checkin, checkout, room_type, guests, mobile], (err, result) => {

    if (err) {
      console.log(err);
      res.send("Error saving booking");
    } else {
      res.send("Booking successful!");
    }

  });

});

// server port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});