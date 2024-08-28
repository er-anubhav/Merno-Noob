// const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'your_jwt_secret_key'; // Use consistent secret key

// // Middleware to verify the token
// // Middleware to verify the token
// function verifyToken(req, res, next) {
//     const token = req.headers['authorization'];
  
//     if (!token) {
//       return res.status(403).send('Access denied. No token provided.');
//     }
  
//     try {
//       // Split and verify token
//       const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
//       req.user = decoded; // Save decoded info (like user ID and role) to the request object
//       next();
//     } catch (error) {
//       return res.status(400).send('Invalid token.');
//     }
//   }
  
//   // Middleware to verify if the user is an admin
//   function verifyAdmin(req, res, next) {
//     if (req.user.role !== 'admin') {  // Assuming your user object has a 'role' field
//       return res.status(403).send('Access denied. Admins only.');
//     }
//     next();
//   }
  
//   // Export both middleware functions
//   module.exports = { verifyToken, verifyAdmin };
  