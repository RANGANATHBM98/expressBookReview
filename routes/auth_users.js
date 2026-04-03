const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateJWT, secret } = require('../middleware/auth.js');

let router = express.Router();
let books = require('../data/booksdb.js');

let users = [];

// Register
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });

    return res.json({ message: "User successfully registered" });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        user => user.username === username && user.password === password
    );

    if (!user) {
        return res.status(403).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });

    return res.json({ message: "Login successful", token });
});

// Add/Modify Review
router.put('/auth/review/:isbn', authenticateJWT, (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.user.username;

    books[isbn].reviews[username] = review;

    return res.json({ message: "Review added/updated successfully" });
});

// Delete Review
router.delete('/auth/review/:isbn', authenticateJWT, (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user.username;

    delete books[isbn].reviews[username];

    return res.json({ message: "Review deleted successfully" });
});

module.exports = router;