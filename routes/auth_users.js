const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateJWT, secret } = require('../middleware/auth.js');

let router = express.Router();
let books = require('../data/booksdb.js');

let users = [];

// ================= REGISTER =================
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    const userExists = users.find(u => u.username === username);

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });

    return res.status(201).json({ message: "User successfully registered" });
});


// ================= LOGIN =================
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(403).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });

    return res.status(200).json({
        message: "Login successful",
        token
    });
});


// ================= ADD / UPDATE REVIEW =================
router.put('/auth/review/:isbn', authenticateJWT, (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.user.username;

    const book = books[isbn];

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!book.reviews) {
        book.reviews = {};
    }

    book.reviews[username] = review;

    return res.status(200).json({
        message: "Review added/updated successfully",
        reviews: book.reviews
    });
});


// ================= DELETE REVIEW =================
router.delete('/auth/review/:isbn', authenticateJWT, (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user.username;

    const book = books[isbn];

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (book.reviews && book.reviews[username]) {
        delete book.reviews[username];
        return res.status(200).json({ message: "Review deleted successfully" });
    }

    return res.status(404).json({ message: "Review not found" });
});

module.exports = router;
