const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite DB
const db = new sqlite3.Database("./TicketTool_DB.db");

// Login API - Updated to match frontend expectations
app.post("/api/TicketsNew/Login", (req, res) => {
  const { emailId, password } = req.body;

  const query = `
    SELECT * FROM NewTicketMasterEmployee 
    WHERE Email = ? AND Password = ?
  `;

  db.get(query, [emailId, password], (err, row) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ result: false, message: "Server error: " + err.message });
    }

    if (row) {
      res.json({ result: true, data: row });
    } else {
      res.json({ result: false, message: "Invalid credentials" });
    }
  });
});

// SignUp/Register API - Create new employee
app.post("/api/TicketsNew/SignUp", (req, res) => {
  console.log("SignUp endpoint hit with data:", req.body);
  const { name, emailId, password, gender, Role } = req.body;

  // Check if email already exists
  const checkQuery = `SELECT * FROM NewTicketMasterEmployee WHERE Email = ?`;
  
  db.get(checkQuery, [emailId], (err, row) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ result: false, message: "Server error: " + err.message });
    }

    if (row) {
      // Email already exists
      return res.json({ result: false, message: "Email already registered" });
    }

    // Insert new employee
    const insertQuery = `
      INSERT INTO NewTicketMasterEmployee (EmployeeName, Email, Password, Gender, Role, "ContactNo.", DeptId) 
      VALUES (?, ?, ?, ?, ?, 0, 0)
    `;

    db.run(insertQuery, [name, emailId, password, gender, Role], function(err) {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ result: false, message: "Failed to create account: " + err.message });
      }

      res.json({ 
        result: true, 
        message: "Account created successfully",
        data: { EmployeeId: this.lastID, EmployeeName: name, Email: emailId }
      });
    });
  });
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
