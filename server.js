// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static("public"));

// // Database connection
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "hotel_booking"
// });

// db.connect(err => {
//     if (err) {
//         console.log("Database connection failed", err);
//     } else {
//         console.log("Connected to MySQL Database");
//     }
// });

// // Insert booking
// app.post("/book", (req, res) => {
//     const { checkin, checkout, roomType, guests, requests } = req.body;

//     const sql = "INSERT INTO bookings (checkin, checkout, room_type, guests, special_requests) VALUES (?, ?, ?, ?, ?)";

//     db.query(sql, [checkin, checkout, roomType, guests, requests], (err, result) => {
//         if (err) {
//             res.status(500).send("Error saving booking");
//         } else {
//             res.send("Booking saved successfully!");
//         }
//     });
// });

// app.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
// });










// // ADMIN LOGIN
// app.post("/login", (req, res) => {
//     const { username, password } = req.body;

//     const sql = "SELECT * FROM admins WHERE username=? AND password=?";
//     db.query(sql, [username, password], (err, result) => {
//         if (result.length > 0) {
//             res.send({ success: true });
//         } else {
//             res.send({ success: false });
//         }
//     });
// });

// // GET ALL BOOKINGS
// app.get("/bookings", (req, res) => {
//     db.query("SELECT * FROM bookings", (err, result) => {
//         res.json(result);
//     });
// });

// // DELETE BOOKING
// app.delete("/delete/:id", (req, res) => {
//     const id = req.params.id;
//     db.query("DELETE FROM bookings WHERE id=?", [id], (err, result) => {
//         res.send("Booking deleted");
//     });
// });










// //adding apis
// // Check room availability
// app.post("/check-availability", (req, res) => {
//     const { roomType, checkin } = req.body;

//     const sql = `
//     SELECT COUNT(*) as booked
//     FROM bookings
//     WHERE room_type=? AND checkin=?`;

//     db.query(sql, [roomType, checkin], (err, result) => {
//         const booked = result[0].booked;

//         db.query("SELECT total_rooms FROM rooms WHERE room_type=?", 
//         [roomType], (err2, result2) => {

//             const total = result2[0].total_rooms;

//             if (booked < total) {
//                 res.send({ available: true });
//             } else {
//                 res.send({ available: false });
//             }
//         });
//     });
// });






// app.put("/approve/:id", (req, res) => {
//     db.query("UPDATE bookings SET status='Approved' WHERE id=?", 
//     [req.params.id], () => {
//         res.send("Approved");
//     });
// });





// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "yourgmail@gmail.com",
//         pass: "your_app_password"
//     }
// });




// app.get("/analytics", (req, res) => {
//     db.query(`
//         SELECT room_type, COUNT(*) as total 
//         FROM bookings 
//         GROUP BY room_type`,
//     (err, result) => {
//         res.json(result);
//     });
// });






const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root", // change if needed
//     database: "hotel_booking"
// });


// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });


const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect(err => {
    if (err) console.log(err);
    else console.log("Connected to MySQL");
});

/* ---------------- BOOKING ---------------- */

app.post("/book", (req, res) => {
    const { checkin, checkout, roomType, guests, requests, mobile } = req.body;

    const sql = `
    INSERT INTO bookings 
    (checkin, checkout, room_type, guests, special_requests, mobile)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [checkin, checkout, roomType, guests, requests, mobile],
        (err) => {
            if (err) return res.status(500).send("Error");
            res.send("Booking Created Successfully");
        });
});


/* ---------------- LOGIN ---------------- */

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM admins WHERE username=? AND password=?",
        [username, password],
        (err, result) => {
            if (result.length > 0)
                res.json({ success: true });
            else
                res.json({ success: false });
        }
    );
});

/* ---------------- GET BOOKINGS ---------------- */

app.get("/bookings", (req, res) => {
    db.query("SELECT * FROM bookings", (err, result) => {
        res.json(result);
    });
});

/* ---------------- DELETE ---------------- */

app.delete("/delete/:id", (req, res) => {
    db.query("DELETE FROM bookings WHERE id=?",
        [req.params.id],
        () => res.send("Deleted"));
});

/* ---------------- APPROVE ---------------- */

app.put("/approve/:id", (req, res) => {
    db.query("UPDATE bookings SET status='Approved' WHERE id=?",
        [req.params.id],
        () => res.send("Approved"));
});

/* ---------------- ANALYTICS ---------------- */

app.get("/analytics", (req, res) => {
    db.query(
        "SELECT room_type, COUNT(*) as total FROM bookings GROUP BY room_type",
        (err, result) => {
            res.json(result);
        }
    );
});

/* ---------------- ROOM AVAILABILITY ---------------- */

app.post("/check-availability", (req, res) => {
    const { roomType, checkin } = req.body;

    db.query(
        "SELECT COUNT(*) as booked FROM bookings WHERE room_type=? AND checkin=?",
        [roomType, checkin],
        (err, result) => {

            const booked = result[0].booked;

            db.query(
                "SELECT total_rooms FROM rooms WHERE room_type=?",
                [roomType],
                (err2, result2) => {

                    const total = result2[0].total_rooms;

                    res.json({ available: booked < total });
                });
        });
});

// app.listen(3000, () =>
//     console.log("Server running on http://localhost:3000")
// );


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});