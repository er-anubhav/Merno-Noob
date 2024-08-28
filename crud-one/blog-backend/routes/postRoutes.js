const express = require('express');
const router = express.Router();
// const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware'); // Adjust path as needed
const postController = require('../controllers/postController'); // Import the controller

// Apply middleware to specific routes
router.get('/', postController.getPosts); // Get all posts
router.post('/', postController.createPost); // Create a new post
router.delete('/:id', postController.deletePost); // Delete a post
router.put('/:id', postController.updatePost); // Update a post

module.exports = router;
