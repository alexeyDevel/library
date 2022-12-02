const express = require('express');
const fs = require('fs');
const router = express.Router();
const bookStore = require('../store/bookStore');
const { errRespNF, baseHref } = require("../constans");

router.get("/api/books/:id/download",(req, res) => {
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

module.exports = router;