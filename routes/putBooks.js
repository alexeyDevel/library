const express = require('express');
const bookStore = require('../store/bookStore');
const fileMulter = require('../middleware/file');
const {errRespNF} = require("../constans");
const router = express.Router();

router.put("/api/books/:id", fileMulter.single('book'), (req, res) => {
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