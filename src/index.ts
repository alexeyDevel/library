import express from 'express';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import booksRoutesForView from './routes/booksRouteForView';
import router from './routes';

const PORT = process.env.PORT || 4000;
const UrlDB = process.env.UrlDB || 'mongodb+srv://admin:Nk10sfjjx4Ycxm4z@cluster0.1tvpdns.mongodb.net/library';

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use('/', booksRoutesForView);
app.use(session({ secret: 'SECRET'}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/', router);

mongoose.set('strictQuery', true);
async function start(PORT: string | number, UrlDB: string){
    try {
        mongoose.connect(UrlDB, function(error: any) {
            if (error) throw error;
                console.log('Successfully connected');
            });
        io.on('connection', (socket: any) => {
            const clientId = socket.id;
            const { roomName } = socket.handshake.query;
            console.log('roomName: ' + roomName);
            socket.join(roomName);

            socket.on('book-message', (msg: any) => {
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

