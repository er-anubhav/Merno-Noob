const db = require('../config/db');

// Create a new post
exports.createPost = (req, res) => {
  const { title, description } = req.body;
  const query = 'INSERT INTO posts (title, description) VALUES (?, ?)';
  db.query(query, [title, description], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.status(201).send({ id: result.insertId });
  });
};

// Get all posts
exports.getPosts = (req, res) => {
  const query = 'SELECT * FROM posts';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
};

// Get a single post by ID
exports.getPostById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM posts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    if (result.length === 0) {
      return res.status(404).send('Post not found');
    }
    res.json(result[0]);
  });
};

// Update a post
exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const query = 'UPDATE posts SET title = ?, description = ? WHERE id = ?';
  db.query(query, [title, description, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Post not found');
    }
    res.send('Post updated successfully');
  });
};

// Delete a post
exports.deletePost = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM posts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Post not found');
    }
    res.send('Post deleted successfully');
  });
};
