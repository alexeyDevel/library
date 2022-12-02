const express = require('express');
const Book = require('../components/book/Book');
const fileMulter = require('../middleware/file');
const bookStore = require('../store/bookStore');
const router = express.Router();

router.post("/api/books", fileMulter.single('book'), (req, res) => {
    let fileBook = "";
    if(req.file){
       fileBook = req.file.path.replaceAll('\\', '/');
    }
    const { books } = bookStore;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    bookStore.addBook(newBook);
    res.status(201);
    res.json(books);
});

module.exports = router;