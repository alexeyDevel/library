"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
System.register("src/constans", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                port: 3000,
                errRespNF: { errcode: 404, errmsg: "not found" },
                baseHref: 'http://localhost:3000/'
            });
        }
    };
});
System.register("src/data", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("default", [
                { "id": "qwe1", "title": "qwe1", "description": "qwe1", "authors": "qwe1", "favorite": "qwe1", "fileCover": "qwe1", "fileName": "qwe1", "fileBook": "public/img/nodejs1.png" },
                { "id": "qwe2", "title": "qwe2", "description": "qwe2", "authors": "qwe2", "favorite": "qwe2", "fileCover": "qwe2", "fileName": "qwe2", "fileBook": "public/img/nodejs2.png" },
                { "id": "qwe3", "title": "qwe3", "description": "qwe3", "authors": "qwe3", "favorite": "qwe3", "fileCover": "qwe3", "fileName": "qwe3", "fileBook": "public/img/nodejs3.png" }
            ]);
        }
    };
});
System.register("src/Interfaces/IBook", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/store/bookStore", ["src/data"], function (exports_4, context_4) {
    "use strict";
    var data_1, bookStore;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (data_1_1) {
                data_1 = data_1_1;
            }
        ],
        execute: function () {
            bookStore = {
                books: data_1.default,
                addBook: function (book) {
                    this.books.push(book);
                }
            };
            exports_4("default", bookStore);
        }
    };
});
System.register("src/middleware/file", ["multer"], function (exports_5, context_5) {
    "use strict";
    var multer_1, storage;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (multer_1_1) {
                multer_1 = multer_1_1;
            }
        ],
        execute: function () {
            storage = multer_1.default.diskStorage({
                destination(req, file, cb) {
                    cb(null, "public/img");
                },
                filename(req, file, cb) {
                    cb(null, `${Date.now()}-${file.originalname}`);
                }
            });
            exports_5("default", multer_1.default({ storage }));
        }
    };
});
System.register("src/components/book/Book", ["uuid"], function (exports_6, context_6) {
    "use strict";
    var uuid_1, Book;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (uuid_1_1) {
                uuid_1 = uuid_1_1;
            }
        ],
        execute: function () {
            Book = class Book {
                constructor(title, description, authors, favorite, fileCover, fileName, fileBook) {
                    this.id = uuid_1.v4(),
                        this.title = title,
                        this.description = description,
                        this.authors = authors,
                        this.favorite = favorite,
                        this.fileCover = fileCover,
                        this.fileName = fileName,
                        this.fileBook = fileBook;
                }
            };
            exports_6("default", Book);
        }
    };
});
System.register("src/routes/booksRouteForView", ["express", "src/store/bookStore", "src/middleware/file", "src/components/book/Book"], function (exports_7, context_7) {
    "use strict";
    var express_1, router, bookStore_1, file_1, Book_1, COUNTER_URL;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (express_1_1) {
                express_1 = express_1_1;
            },
            function (bookStore_1_1) {
                bookStore_1 = bookStore_1_1;
            },
            function (file_1_1) {
                file_1 = file_1_1;
            },
            function (Book_1_1) {
                Book_1 = Book_1_1;
            }
        ],
        execute: function () {
            router = express_1.default.Router();
            COUNTER_URL = process.env.COUNTER_URL || "http://localhost:5000";
            router.get('/', (req, res) => {
                const { books } = bookStore_1.default;
                res.render("books/index", {
                    title: "Books",
                    books: books,
                });
            });
            router.get("/book/create", (req, res) => {
                res.render("books/create", {
                    title: "Create"
                });
            });
            router.post("/books/createnew", file_1.default.single('book'), (req, res) => {
                let fileBook = "";
                if (req.file) {
                    fileBook = req.file.path.replaceAll('\\', '/');
                }
                const { title, description, authors, favorite, fileCover, fileName } = req.body;
                const newBook = new Book_1.default(title, description, authors, favorite, fileCover, fileName, fileBook);
                bookStore_1.default.addBook(newBook);
                res.redirect('/');
            });
            router.get("/books/:id", (req, res) => {
                const { books } = bookStore_1.default;
                const { id } = req.params;
                const ind = books.findIndex((item) => item.id === id);
                if (ind !== -1) {
                    res.render('books/view', {
                        title: 'View',
                        book: books[ind],
                    });
                }
                else {
                    res.redirect('/404');
                }
            });
            router.post("/books/delete/:id", (req, res) => {
                const { books } = bookStore_1.default;
                const { id } = req.params;
                const ind = books.findIndex((item) => item.id === id);
                if (ind !== -1) {
                    books.splice(ind, 1);
                    res.redirect('/');
                }
                else {
                    res.render('/404');
                }
            });
            router.get("/books/update/:id", (req, res) => {
                const { books } = bookStore_1.default;
                const { id } = req.params;
                const ind = books.findIndex((item) => item.id === id);
                if (ind !== -1) {
                    res.render('books/update', {
                        title: 'Update',
                        book: books[ind]
                    });
                }
                else {
                    res.redirect('/404');
                }
            });
            router.post("/books/update/:id", file_1.default.single('book'), (req, res) => {
                const { books } = bookStore_1.default;
                let fileBook = "";
                if (req.file) {
                    fileBook = req.file.path.replaceAll('\\', '/');
                }
                const { title, description, authors, favorite, fileCover, fileName } = req.body;
                const { id } = req.params;
                const ind = books.findIndex((item) => item.id === id);
                if (ind !== -1) {
                    books[ind] = Object.assign(Object.assign({}, books[ind]), { title,
                        description,
                        authors,
                        favorite,
                        fileCover,
                        fileName,
                        fileBook });
                    res.redirect('/');
                }
                else {
                    res.redirect('/404');
                }
            });
            exports_7("default", router);
        }
    };
});
System.register("src/middleware/error404", [], function (exports_8, context_8) {
    "use strict";
    var errRespNF;
    var __moduleName = context_8 && context_8.id;
    function err404(req, res) {
        res.json(404);
        res.json(errRespNF);
    }
    exports_8("err404", err404);
    return {
        setters: [],
        execute: function () {
            errRespNF = { errcode: 404, errmsg: "not found" };
        }
    };
});
System.register("src/models/bookModel", ["mongoose"], function (exports_9, context_9) {
    "use strict";
    var mongoose_1, bookSchema;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (mongoose_1_1) {
                mongoose_1 = mongoose_1_1;
            }
        ],
        execute: function () {
            bookSchema = new mongoose_1.Schema({
                // _id: mongoose.Schema.Types.ObjectId,
                id: {
                    type: String,
                    required: true,
                },
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    default: '',
                },
                authors: {
                    type: String,
                    default: '',
                },
                favorite: {
                    type: String,
                    default: '',
                },
                fileCover: {
                    type: String,
                    default: '',
                },
                fileName: {
                    type: String,
                    default: '',
                },
                fileBook: {
                    type: String,
                }
            });
            exports_9("default", mongoose_1.model('Book', bookSchema));
        }
    };
});
System.register("src/controllers/bookRepository", ["src/models/bookModel"], function (exports_10, context_10) {
    "use strict";
    var bookModel_1, BooksRepository;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (bookModel_1_1) {
                bookModel_1 = bookModel_1_1;
            }
        ],
        execute: function () {
            // export class Book implements IBook {
            // }
            BooksRepository = class BooksRepository {
                createBook(book) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const newBook = yield bookModel_1.default.create(book);
                        return newBook;
                    });
                }
                ;
                getBook(id) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const book = yield bookModel_1.default.find({ 'id': id });
                        return book;
                    });
                }
                ;
                getBooks() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const books = yield bookModel_1.default.find();
                        return books;
                    });
                }
                ;
                updateBook(book) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const result = yield bookModel_1.default.updateOne({ id: book.id }, {
                            title: book.title,
                            description: book.description,
                            authors: book.authors,
                            favorite: book.favorite,
                            fileCover: book.fileCover,
                            fileName: book.fileName,
                            fileBook: book.fileBook
                        });
                        return result;
                    });
                }
                ;
                deleteBook(id) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const result = yield bookModel_1.default.deleteOne({ id: id });
                        return result;
                    });
                }
                ;
                downloadBook(id) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const books = yield bookModel_1.default.find({ 'id': id });
                        return books;
                    });
                }
            };
            exports_10("BooksRepository", BooksRepository);
        }
    };
});
System.register("src/routes/containter/container", ["src/controllers/bookRepository", "inversify"], function (exports_11, context_11) {
    "use strict";
    var bookRepository_1, inversify_1, container;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (bookRepository_1_1) {
                bookRepository_1 = bookRepository_1_1;
            },
            function (inversify_1_1) {
                inversify_1 = inversify_1_1;
            }
        ],
        execute: function () {
            container = new inversify_1.Container();
            container.bind(bookRepository_1.BooksRepository).toSelf();
            exports_11("default", container);
        }
    };
});
System.register("src/controllers/book", ["uuid", "src/routes/containter/container", "src/controllers/bookRepository", "src/constans"], function (exports_12, context_12) {
    "use strict";
    var uuid_2, container_1, bookRepository_2, constans_1, bookRepository;
    var __moduleName = context_12 && context_12.id;
    function createBook(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, authors, favorite, fileCover, fileName } = req.body;
            let fileBook = "";
            if (req.file) {
                fileBook = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.replaceAll('\\', '/');
            }
            try {
                const newBook = yield bookRepository.createBook({ id: uuid_2.v4(), title: title,
                    description: description, authors: authors, favorite: favorite,
                    fileCover: fileCover, fileName: fileName, fileBook: fileBook });
                res.status(201).json(newBook);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    exports_12("createBook", createBook);
    function getOneBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (id) {
                    const books = yield bookRepository.getBook(id);
                    if (books.length > 0) {
                        res.status(200).json(books);
                    }
                    else {
                        res.status(404).json(constans_1.default.errRespNF);
                    }
                }
                else {
                    res.json(constans_1.default.errRespNF);
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    exports_12("getOneBook", getOneBook);
    function getBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield bookRepository.getBooks();
                res.json(books);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    exports_12("getBooks", getBooks);
    function updateBook(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, description, authors, favorite, fileCover, fileName } = req.body;
            let fileBook = "";
            if (req.file) {
                fileBook = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.replaceAll('\\', '/');
            }
            try {
                const result = yield bookRepository.updateBook({ id,
                    title,
                    description,
                    authors,
                    favorite,
                    fileCover,
                    fileName,
                    fileBook
                });
                if (result.matchedCount > 0) {
                    res.status(200).json(result);
                }
                else {
                    res.status(404).json(constans_1.default.errRespNF);
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    exports_12("updateBook", updateBook);
    function deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield bookRepository.deleteBook(id);
                if (result.deletedCount > 0) {
                    res.status(200).json({ msg: 'OK' });
                }
                else {
                    res.status(404).json(constans_1.default.errRespNF);
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    exports_12("deleteBook", deleteBook);
    function downloadBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (id) {
                    const books = yield bookRepository.getBook(id);
                    res.download(books[0].fileBook, books[0].fileName, (err) => {
                        if (err) {
                            res.status(500).send({
                                message: "Could not download the file. " + err,
                            });
                        }
                    });
                }
                else {
                    res.status(500).json(constans_1.default.errRespNF);
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    exports_12("downloadBook", downloadBook);
    return {
        setters: [
            function (uuid_2_1) {
                uuid_2 = uuid_2_1;
            },
            function (container_1_1) {
                container_1 = container_1_1;
            },
            function (bookRepository_2_1) {
                bookRepository_2 = bookRepository_2_1;
            },
            function (constans_1_1) {
                constans_1 = constans_1_1;
            }
        ],
        execute: function () {
            bookRepository = container_1.default.get(bookRepository_2.BooksRepository);
            ;
        }
    };
});
System.register("src/routes/booksApi/books", ["express", "src/middleware/file", "src/controllers/book"], function (exports_13, context_13) {
    "use strict";
    var express_2, file_2, book_1, router, COUNTER_URL;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (express_2_1) {
                express_2 = express_2_1;
            },
            function (file_2_1) {
                file_2 = file_2_1;
            },
            function (book_1_1) {
                book_1 = book_1_1;
            }
        ],
        execute: function () {
            router = express_2.default.Router();
            COUNTER_URL = process.env.COUNTER_URL || "http://localhost:5000";
            router.get("/books/:id", book_1.getOneBook);
            router.get("/books/:id/download", book_1.downloadBook);
            router.get("/books", book_1.getBooks);
            router.post("/books", file_2.default.single('book'), book_1.createBook);
            router.delete("/books/:id", book_1.deleteBook);
            router.put("/books/:id", file_2.default.single('book'), book_1.updateBook);
            exports_13("default", router);
        }
    };
});
System.register("src/routes/auth", [], function (exports_14, context_14) {
    "use strict";
    var passport, LocalStrategy, express, router, dbUsers, options;
    var __moduleName = context_14 && context_14.id;
    function verify(username, password, done) {
        dbUsers.findByUserName(username, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!dbUsers.verifyPassword(user, password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
    return {
        setters: [],
        execute: function () {
            passport = require('passport');
            LocalStrategy = require('passport-local').Strategy;
            express = require('express');
            router = express.Router();
            dbUsers = require('../db/users');
            options = {
                usernameField: "username",
                passwordField: "password",
            };
            passport.use('local', new LocalStrategy(options, verify));
            passport.serializeUser((user, cb) => {
                cb(null, user.id);
            });
            passport.deserializeUser((id, cb) => {
                dbUsers.findById(id, (err, user) => {
                    if (err) {
                        return cb(err);
                    }
                    cb(null, user);
                });
            });
            router.get('/user/login', (req, res) => {
                res.render('auth/login', {
                    title: 'Login'
                });
            });
            router.get('/user/logout', (req, res, next) => {
                req.logout(function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/api/user/login');
                });
            });
            router.get('/user/me', (req, res, next) => {
                if (!req.isAuthenticated()) {
                    return res.redirect('/api/user/login');
                }
                else
                    next();
            }, (req, res) => {
                res.render('auth/profile', {
                    title: 'My pofile',
                    user: req.user,
                });
            });
            router.post('/user/login', passport.authenticate('local', { failureRedirect: '/api/user/login' }), (req, res) => {
                res.redirect('/api/user/me');
            });
            router.post('/user/signup', (req, res, next) => {
                const { userName, displayName, email, age, password } = req.body;
                const result = dbUsers.createUser({ userName, displayName, email, age, password });
                if (result.user) {
                    req.logIn(result.user, function (err) {
                        if (err) {
                            return next(err);
                        }
                        res.redirect('/api/user/me');
                    });
                }
                else {
                    res.json(result.err);
                }
            });
            exports_14("default", router);
        }
    };
});
System.register("src/routes/index", ["express", "src/routes/booksRouteForView", "src/middleware/error404", "src/routes/booksApi/books", "src/routes/auth"], function (exports_15, context_15) {
    "use strict";
    var express_3, booksRouteForView_1, error404_1, books_1, auth_1, router;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (express_3_1) {
                express_3 = express_3_1;
            },
            function (booksRouteForView_1_1) {
                booksRouteForView_1 = booksRouteForView_1_1;
            },
            function (error404_1_1) {
                error404_1 = error404_1_1;
            },
            function (books_1_1) {
                books_1 = books_1_1;
            },
            function (auth_1_1) {
                auth_1 = auth_1_1;
            }
        ],
        execute: function () {
            router = express_3.default.Router();
            router.use('/', booksRouteForView_1.default);
            router.use('/api', books_1.default);
            router.use('/api', auth_1.default);
            router.use(error404_1.err404);
            exports_15("default", router);
        }
    };
});
System.register("src/index", ["express", "express-session", "passport", "mongoose", "http", "socket.io", "src/routes/booksRouteForView", "src/routes/index"], function (exports_16, context_16) {
    "use strict";
    var express_4, express_session_1, passport_1, mongoose_2, app, http_1, server, socket_io_1, io, booksRouteForView_2, routes_1, PORT, UrlDB;
    var __moduleName = context_16 && context_16.id;
    function start(PORT, UrlDB) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                mongoose_2.default.connect(UrlDB, function (error) {
                    if (error)
                        throw error;
                    console.log('Successfully connected');
                });
                io.on('connection', (socket) => {
                    const clientId = socket.id;
                    const { roomName } = socket.handshake.query;
                    console.log('roomName: ' + roomName);
                    socket.join(roomName);
                    socket.on('book-message', (msg) => {
                        msg.type = `roomName: ${roomName}`;
                        socket.to(roomName).emit('book-message', msg);
                        socket.emit('book-message', msg);
                    });
                    socket.on('disconnect', () => {
                        console.log('user disconnected');
                    });
                });
                server.listen(PORT);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    return {
        setters: [
            function (express_4_1) {
                express_4 = express_4_1;
            },
            function (express_session_1_1) {
                express_session_1 = express_session_1_1;
            },
            function (passport_1_1) {
                passport_1 = passport_1_1;
            },
            function (mongoose_2_1) {
                mongoose_2 = mongoose_2_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (socket_io_1_1) {
                socket_io_1 = socket_io_1_1;
            },
            function (booksRouteForView_2_1) {
                booksRouteForView_2 = booksRouteForView_2_1;
            },
            function (routes_1_1) {
                routes_1 = routes_1_1;
            }
        ],
        execute: function () {
            app = express_4.default();
            server = http_1.default.createServer(app);
            io = new socket_io_1.Server(server);
            PORT = process.env.PORT || 4000;
            UrlDB = process.env.UrlDB || 'mongodb+srv://admin:Nk10sfjjx4Ycxm4z@cluster0.1tvpdns.mongodb.net/library';
            app.use(express_4.default.urlencoded());
            app.set("view engine", "ejs");
            app.use('/', booksRouteForView_2.default);
            app.use(express_session_1.default({ secret: 'SECRET' }));
            app.use(passport_1.default.initialize());
            app.use(passport_1.default.session());
            app.use(express_4.default.json());
            app.use('/', routes_1.default);
            mongoose_2.default.set('strictQuery', true);
            start(PORT, UrlDB);
        }
    };
});
const { v4: uuid } = require("uuid");
class User {
    constructor(userName, displayName, email, age, password) {
        this.id = uuid(),
            this.userName = userName,
            this.displayName = displayName,
            this.email = email,
            this.age = age,
            this.password = password;
    }
}
module.exports = User;
System.register("src/store/users", [], function (exports_17, context_17) {
    "use strict";
    var users;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [],
        execute: function () {
            users = [
                {
                    id: "1",
                    userName: 'user1',
                    password: '123',
                    displayName: 'Alexey',
                    email: 'user@mail.ru',
                    age: "24",
                },
                {
                    id: "2",
                    userName: 'user2',
                    password: '123',
                    displayName: 'Sasha',
                    email: 'user@mail.ru',
                    age: "22",
                },
                {
                    id: "3",
                    userName: 'user3',
                    password: '123',
                    displayName: 'Nikita',
                    email: 'user@mail.ru',
                    age: "28",
                }
            ];
            exports_17("default", users);
        }
    };
});
