const express = require('express');
let router = express.Router();
let books = require('../data/booksdb.js');

// Get all books
router.get('/', (req, res) => {
    return res.json(books);
});

// Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    return res.json(books[isbn]);
});

// Get books by author
router.get('/author/:author', (req, res) => {
    const author = req.params.author;

    const filtered = Object.values(books).filter(
        book => book.author.toLowerCase() === author.toLowerCase()
    );

    return res.json(filtered);
});

// Get books by title
router.get('/title/:title', (req, res) => {
    const title = req.params.title;

    const filtered = Object.values(books).filter(
        book => book.title.toLowerCase() === title.toLowerCase()
    );

    return res.json(filtered);
});

// Get book review
router.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    return res.json(books[isbn].reviews);
});

module.exports = router;