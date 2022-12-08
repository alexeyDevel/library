const express = require('express');
const router = express.Router();
const { errRespNF } = require("../../constans");
const bookStore = require('../../store/bookStore');

router.get("/api/books/:id",(req, res) => {
    const { books } = bookStore;
    const { id } = req.params;
    const ind = books.findIndex(item => item.id === id);
    if(ind !== -1){
        res.json(books[ind]);
    }else{
        res.status(404);
        res.json(errRespNF);
    }
});

module.exports = router;