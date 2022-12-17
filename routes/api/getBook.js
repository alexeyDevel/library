const express = require('express');
const axios = require('axios');
const router = express.Router();
const { errRespNF } = require("../../constans");
const bookStore = require('../../store/bookStore');
const COUNTER_URL = process.env.COUNTER_URL || "http://localhost:5000";

router.get("/api/books/:id",(req, res) => {
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

module.exports = router;