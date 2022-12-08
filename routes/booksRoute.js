const express = require('express');
const router = express.Router();
const bookStore = require('../store/bookStore');

router.get('/', (req, res) => {
    const { books } = bookStore;
    res.render("books/index", {
        title: "Books",
        books: books,
    });
});

module.exports = router;