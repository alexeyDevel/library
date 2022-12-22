const express = require('express');
const mongoose = require('mongoose');
const booksRoutesForView = require('./routes/booksRouteForView');
const books = require('./routes/api/books');
const err404 = require('./middleware/error404');
const {  v4: uuid } = require('uuid');
const app = express();
const PORT = process.env.PORT || 4000;
const UrlDB = process.env.UrlDB || 'mongodb+srv://admin:Nk10sfjjx4Ycxm4z@cluster0.1tvpdns.mongodb.net/library';

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use('/', booksRoutesForView);


app.use(express.json());
app.use('/api', books);
app.use(err404);

mongoose.set('strictQuery', true);
async function start(PORT, UrlDB){
    try {
        mongoose.connect(UrlDB, function(error) {
            if (error) throw err;
                console.log('Successfully connected');
            });
        app.listen(PORT);
    } catch (error) {
        console.log(error);
    }
}

start(PORT, UrlDB);



