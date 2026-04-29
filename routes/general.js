const express = require('express');
const axios = require('axios');

let router = express.Router();
const BASE_URL = "http://localhost:5000/books";

// Get all books
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(BASE_URL);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

// Get book by ISBN (FIXED)
router.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const response = await axios.get(BASE_URL);
        const books = response.data;

        if (books[isbn]) {
            return res.status(200).json(books[isbn]);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching book" });
    }
});

// Get books by author
router.get('/author/:author', async (req, res) => {
    const author = req.params.author;

    try {
        const response = await axios.get(BASE_URL);
        const books = Object.values(response.data);

        const filtered = books.filter(
            book => book.author.toLowerCase() === author.toLowerCase()
        );

        if (filtered.length > 0) {
            return res.status(200).json(filtered);
        } else {
            return res.status(404).json({ message: "No books found for this author" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

// Get books by title
router.get('/title/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const response = await axios.get(BASE_URL);
        const books = Object.values(response.data);

        const filtered = books.filter(
            book => book.title.toLowerCase() === title.toLowerCase()
        );

        if (filtered.length > 0) {
            return res.status(200).json(filtered);
        } else {
            return res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});

module.exports = router;
