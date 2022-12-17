const express = require('express');
const booksRoute = require('./routes/booksRoute');
const currentBookRoute = require('./routes/currentBookRoute');
const deleteBooksRoute = require('./routes/deleteBooksRoute');
const updateBooksRoute = require('./routes/updateBooksRoute');
const createBookRoute = require('./routes/createBookRoute');
const getBooks = require('./routes/api/getBooks');
const postLogin = require('./routes/api/postLogin');
const getBook = require('./routes/api/getBook');
const postBook = require('./routes/api/postBooks');
const putBooks = require('./routes/api/putBooks');
const deleteBooks = require('./routes/api/deleteBooks');
const getBookFile = require('./routes/api/getBookFile');
const err404 = require('./middleware/error404');
const {  v4: uuid } = require('uuid');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use('/', booksRoute);
app.use('/', currentBookRoute);
app.use('/', deleteBooksRoute);
app.use('/', updateBooksRoute);
app.use('/', createBookRoute);

app.use(express.json());
app.use('/', postLogin);
app.use('/', getBooks);
app.use('/', getBook);
app.use('/', postBook);
app.use('/', putBooks);
app.use('/', deleteBooks);
app.use('/', getBookFile);
app.use(err404);

app.listen(PORT);


