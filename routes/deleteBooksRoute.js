const express = require('express');
const bookStore = require('../store/bookStore');
const router = express.Router();

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

module.exports = router;