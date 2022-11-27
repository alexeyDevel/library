const express = require('express');
const http = require('http');
const { data } = require('./data');
const {  v4: uuid } = require("uuid");
const app = express();

const store = {
    books: data
}
const login = { id: 1, mail: "test@mail.ru" };
class Book{
    constructor( id = uuid(), title, description, authors, favorite, fileCover, fileName) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.authors = authors,
        this.favorite = favorite,
        this.fileCover = fileCover,
        this.fileName = fileName
    }
}

app.use(express.json());

app.post("/api/user/login",(req, res) => {
    res.json(login);
});
app.get("/api/books",(req, res) => {
    const { books } = store;
    res.json(books);
});
app.get("/api/books/:id",(req, res) => {
    const { books } = store;
    const { id } = req.params;
    const ind = books.findIndex(item => item.id === id);
    if(ind !== -1){
        res.json(books[ind]);
    }else{
        res.status(404);
        res.json("404 страница не найдена");
    }


});
app.post("/api/books",(req, res) => {
    const { books } = store;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);
    res.status(201);
    res.json(books);
});
app.put("/api/books/:id",(req, res) => {
    const { books } = store;
    const {
        title, description, authors,
        favorite, fileCover, fileName } = req.body;
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
            fileName
        }
        res.json(books[ind]);
    }else {
        res.status(404);
        res.json("404 страница не найдена");
    }
});
app.delete("/api/books/:id", (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const ind = books.findIndex(item => item.id === id);
    if(ind !== -1){
        books.splice(ind, 1);
        res.json(books);
    }else{
        res.status(404);
        res.json("404 страница не найдена")
    }
})

const PORT = 3000;
app.listen(PORT);


