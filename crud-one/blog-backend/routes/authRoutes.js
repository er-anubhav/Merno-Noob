const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Assuming you have a db.js file for MySQL connection
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Register route
// Example: Register route
router.post('/register', async (req, res) => {
    const { username, password, role = 'user' } = req.body; // Default role is 'user'
  
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], (err, results) => {
          if (err) throw err;
          res.status(201).json({ message: 'User registered successfully' });
        });
      }
    });
  });  

// Login route
// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the user exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      const user = results[0];
  
      // Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
        // Generate a JWT token with user role included
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
  });
  
  

module.exports = router;
