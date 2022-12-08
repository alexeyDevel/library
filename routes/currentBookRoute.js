const express = require('express');
const router = express.Router();
const { errRespNF } = require("../constans");
const bookStore = require('../store/bookStore');

router.get("/books/:id",(req, res) => {
    const { books } = bookStore;
    const { id } = req.params;
    const ind = books.findIndex(item => item.id === id);
    if(ind !== -1){
        res.render('books/view',{
            title: 'View',
            book: books[ind]
        })
    }else{
        res.redirect('/404');
    }
});

module.exports = router;