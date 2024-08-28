const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes')

const app = express();
const port = 5000; // Your backend port

// Enable CORS for all routes
app.use(cors());

// Other middleware
app.use(express.json());

app.use('/api', postRoutes); // Adjust the base path as necessary


// Routes
app.use('/posts', require('./routes/postRoutes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
