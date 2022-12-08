const express = require('express');
const bookStore = require('../../store/bookStore');
const {errRespNF} = require("../../constans");
const router = express.Router();

router.delete("/api/books/:id",(req, res) => {
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

module.exports = router;