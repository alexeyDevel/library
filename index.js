const express = require('express');
const booksRoutesForView = require('./routes/booksRouteForView');
const books = require('./routes/api/books');
const err404 = require('./middleware/error404');
const {  v4: uuid } = require('uuid');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use('/', booksRoutesForView);


app.use(express.json());
app.use('/api', books);
app.use(err404);

app.listen(PORT);


