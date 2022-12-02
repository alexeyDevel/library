const express = require('express');
const router = express.Router();
const bookStore = require('../store/bookStore');

router.get("/api/books",(req, res) => {
    const { books } = bookStore;
    res.json(books);
});
module.exports = router;