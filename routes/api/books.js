const express = require('express');
const axios = require('axios');
const bookStore = require('../../store/bookStore');
const { errRespNF } = require("../../constans");
const fileMulter = require("../../middleware/file");
const Book = require("../../components/book/Book");
const router = express.Router();
const login = { id: 1, mail: "test@mail.ru" };

const COUNTER_URL = process.env.COUNTER_URL || "http://localhost:5000";

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
                            res.json({count: result.data.count, ...books[ind]})
                        });
                }else{
                    res.json(resultIncr)
                }
            })
            .catch(err => res.json({tit: "error", ...err}));
    }else{
        res.status(404);
        res.json(errRespNF);
    }
});

router.get("/books/:id/download",(req, res) => {
    const { books } = bookStore;
    const { id } = req.params;
    const ind = books.findIndex(item => item.id === id);
    if(ind !== -1){
        console.log(books[ind]);
        res.download(books[ind].fileBook, books[ind].fileName, (err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not download the file. " + err,
                });
            }
        });
    }else {
        res.status(404);
        res.json(errRespNF);
    }
});

router.get("/books",(req, res) => {
    const { books } = bookStore;
    res.json(books);
});

router.post("/books", fileMulter.single('book'), (req, res) => {
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

router.post("/user/login",(req, res) => {
    res.json(login);
});

router.delete("/books/:id",(req, res) => {
    const { books } = bookStore;
    const { id } = req.params;
    const ind = books.findIndex(item => item.id === id);
    if(ind !== -1){
        books.splice(ind, 1);
        res.json("Ok");
    }else{
        res.status(404);
        res.json(errRespNF)
    }
});

router.put("/books/:id", fileMulter.single('book'), (req, res) => {
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
        res.json(books[ind]);
    }else {
        res.status(404);
        res.json(errRespNF);
    }
});

module.exports = router;