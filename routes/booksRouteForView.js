const express = require('express');
const router = express.Router();
const bookStore = require('../store/bookStore');
const fileMulter = require("../middleware/file");
const Book = require("../components/book/Book");
const axios = require("axios");
const COUNTER_URL = process.env.COUNTER_URL || "http://localhost:5000";

router.get('/', (req, res) => {
    const { books } = bookStore;
    res.render("books/index", {
        title: "Books",
        books: books,
    });
});

router.get("/book/create", (req, res) => {
    res.render("books/create", {
        title: "Create"
    });
});

router.post("/books/createnew", fileMulter.single('book'), (req, res) => {
    let fileBook = "";
    if(req.file){
        fileBook = req.file.path.replaceAll('\\', '/');
    }
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    bookStore.addBook(newBook);
    res.redirect('/');
});

router.get("/books/:id",(req, res) => {
    const { books } = bookStore;
    const { id } = req.params;
    const ind = books.findIndex(item => item.id === id);
    if(ind !== -1){
        axios
            .post(`${COUNTER_URL}/counter/${id}/incr`)
            .then(resultIncr => {
                if(resultIncr.data.message === 'OK'){
                    axios
                        .get(`${COUNTER_URL}/counter/${id}`)
                        .then(result => {
                            res.render('books/view',{
                                title: 'View',
                                book: books[ind],
                                count: result.data.count
                            })
                        });
                }else{
                    res.json(resultIncr)
                }
            })
            .catch(err => res.json({tit: "error", ...err}));

    }else{
        res.redirect('/404');
    }
});

router.get("/books/:id",(req, res) => {
    const { books } = bookStore;
    const { id } = req.params;
    const ind = books.findIndex(item => item.id === id);
    if(ind !== -1){
        axios
            .post(`${COUNTER_URL}/counter/${id}/incr`)
            .then(resultIncr => {
                if(resultIncr.data.message === 'OK'){
                    axios
                        .get(`${COUNTER_URL}/counter/${id}`)
                        .then(result => {
                            res.render('books/view',{
                                title: 'View',
                                book: books[ind],
                                count: result.data.count
                            })
                        });
                }else{
                    res.json(resultIncr)
                }
            })
            .catch(err => res.json({tit: "error", ...err}));

    }else{
        res.redirect('/404');
    }
});

router.post("/books/delete/:id",(req, res) => {
    const { books } = bookStore;
    const { id } = req.params;
    const ind = books.findIndex(item => item.id === id);
    if(ind !== -1){
        books.splice(ind, 1);
        res.redirect('/');
    }else{
        res.render('/404');
    }
});

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