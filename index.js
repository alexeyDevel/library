const express = require('express');
const getBooks = require('./routes/getBooks');
const postLogin = require('./routes/postLogin');
const getBook = require('./routes/getBook');
const postBook = require('./routes/postBooks');
const putBooks = require('./routes/putBooks');
const deleteBooks = require('./routes/deleteBooks');
const getBookFile = require('./routes/getBookFile');
const err404 = require('./middleware/error404');
const {  v4: uuid } = require('uuid');
const app = express();
const PORT = 3000;

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


