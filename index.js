const express = require('express');
const bodyParser = require('body-parser');

const generalRoutes = require('./routes/general');
const authRoutes = require('./routes/auth_users');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/books', generalRoutes);
app.use('/customer', authRoutes);

// Health check route
app.get('/', (req, res) => {
    res.status(200).send("Book Review API is running");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
