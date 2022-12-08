const express = require('express');
const bookStore = require('../store/bookStore');
const fileMulter = require("../middleware/file");
const router = express.Router();

router.get("/books/update/:id", (req, res) => {
    const { books } = bookStore;
    const { id } = req.params;
    const ind = books.findIndex(item => item.id === id);
    if(ind !== -1){
        res.render('books/update',{
            title: 'Update',
            book: books[ind]
        });
    }else {
        res.redirect('/404');
    }
});
router.post("/books/update/:id", fileMulter.single('book'), (req, res) => {
    const { books } = bookStore;
    let fileBook = "";
    if(req.file){
        fileBook = req.file.path.replaceAll('\\', '/');
    }
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;
    const ind = books.findIndex(item => item.id === id);
    if(ind !== -1){
        books[ind] = {
            ...books[ind],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        }
        res.redirect('/');
    }else {
        res.redirect('/404');
    }
});

module.exports = router;