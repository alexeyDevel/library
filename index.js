const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const booksRoutesForView = require('./routes/booksRouteForView');
const books = require('./routes/booksApi/books');
const auth = require('./routes/auth');
const err404 = require('./middleware/error404');
const {  v4: uuid } = require('uuid');

const PORT = process.env.PORT || 4000;
const UrlDB = process.env.UrlDB || 'mongodb+srv://admin:Nk10sfjjx4Ycxm4z@cluster0.1tvpdns.mongodb.net/library';

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use('/', booksRoutesForView);
app.use(session({ secret: 'SECRET'}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/api', books);
app.use('/api', auth);
app.use(err404);

mongoose.set('strictQuery', true);
async function start(PORT, UrlDB){
    try {
        mongoose.connect(UrlDB, function(error) {
            if (error) throw err;
                console.log('Successfully connected');
            });
        io.on('connection', (socket) => {
            const clientId = socket.id;
            const { roomName } = socket.handshake.query;
            console.log('roomName: ' + roomName);
            socket.join(roomName);

            socket.on('book-message', (msg) => {
                msg.type = `roomName: ${roomName}`;
                socket.to(roomName).emit('book-message', msg)
                socket.emit('book-message', msg)
            });
            socket.on('disconnect', () => {
              console.log('user disconnected');
            });
        });
        server.listen(PORT);
    } catch (error) {
        console.log(error);
    }
}

start(PORT, UrlDB);

  


