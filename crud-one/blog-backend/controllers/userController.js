// // controllers/userController.js
// const bcrypt = require('bcrypt');
// const db = require('../config/db');

// // Register a new user
// exports.register = (req, res) => {
//   const { username, password } = req.body;

//   // Check if username or password is missing
//   if (!username || !password) {
//     return res.status(400).send('Username and password are required');
//   }

//   // Hash the password
//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) {
//       console.error('Error hashing password:', err);
//       return res.status(500).send('Server error');
//     }

//     // Save user to database
//     const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
//     db.query(query, [username, hashedPassword], (err, result) => {
//       if (err) {
//         console.error('Error registering user:', err);
//         return res.status(500).send('Failed to register user');
//       }
//       res.status(201).send('User registered successfully');
//     });
//   });
// };
