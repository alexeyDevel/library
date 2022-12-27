const express = require('express');
const {v4: uuid} = require("uuid");
const axios = require('axios');
const bookStore = require('../../store/bookStore');
const { errRespNF } = require("../../constans");
const fileMulter = require("../../middleware/file");
const Book = require("../../components/book/Book");
const BookModel = require('../../models/bookModel');
const router = express.Router();

const COUNTER_URL = process.env.COUNTER_URL || "http://localhost:5000";

router.get("/books/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if(id){
            const books = await BookModel.find({'id': id});
            if(books.length > 0 ){
                res.status(200).json(books); 
            }else {
                res.status(404).json(errRespNF); 
            }
              
        }else{
            res.json(errRespNF); 
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/books/:id/download", async (req, res) => {
    const { id } = req.params;
    try {
        if(id){
            const books = await BookModel.find({'id': id});
            res.download(books[ind].fileBook, books[ind].fileName, (err) => {
                if (err) {
                    res.status(500).send({
                        message: "Could not download the file. " + err,
                    });
                }
            });   
        }else{
            res.status(500).json(errRespNF); 
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/books", async (req, res) => {
    try {
        const books = await BookModel.find();
        res.json(books);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/books", fileMulter.single('book'), async (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    let fileBook = "";
    if(req.file){
        fileBook = req.file?.path.replaceAll('\\', '/');
    }
    try {
        const book = await BookModel.create({id: uuid(), title: title,
             description:description, authors:authors, favorite:favorite,
             fileCover:fileCover, fileName:fileName, fileBook: fileBook});
        res.status(201).json(book);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/books/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await BookModel.deleteOne({id:id});
        if(result.deletedCount > 0){
            res.status(200).json({msg: 'OK'});
        }else{
            res.status(404).json(errRespNF);
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/books/:id", fileMulter.single('book'), async (req, res) => {
    const { id } = req.params;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    let fileBook = "";
    if(req.file){
        fileBook = req.file?.path.replaceAll('\\', '/');
    }
    try {
        const result = await BookModel.updateOne({id:id}, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        });
        if(result.matchedCount > 0 ){
            res.status(200).json(result); 
        }else {
            res.status(404).json(errRespNF); 
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;