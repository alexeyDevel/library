"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var bookStore_1 = __importDefault(require("../store/bookStore"));
var file_1 = __importDefault(require("../middleware/file"));
var Book_1 = __importDefault(require("../components/book/Book"));
var COUNTER_URL = process.env.COUNTER_URL || "http://localhost:5000";
router.get('/', function (req, res) {
    var books = bookStore_1.default.books;
    res.render("books/index", {
        title: "Books",
        books: books,
    });
});
router.get("/book/create", function (req, res) {
    res.render("books/create", {
        title: "Create"
    });
});
router.post("/books/createnew", file_1.default.single('book'), function (req, res) {
    var fileBook = "";
    if (req.file) {
        fileBook = req.file.path.replaceAll('\\', '/');
    }
    var _a = req.body, title = _a.title, description = _a.description, authors = _a.authors, favorite = _a.favorite, fileCover = _a.fileCover, fileName = _a.fileName;
    var newBook = new Book_1.default(title, description, authors, favorite, fileCover, fileName, fileBook);
    bookStore_1.default.addBook(newBook);
    res.redirect('/');
});
router.get("/books/:id", function (req, res) {
    var books = bookStore_1.default.books;
    var id = req.params.id;
    var ind = books.findIndex(function (item) { return item.id === id; });
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
router.post("/books/delete/:id", function (req, res) {
    var books = bookStore_1.default.books;
    var id = req.params.id;
    var ind = books.findIndex(function (item) { return item.id === id; });
    if (ind !== -1) {
        books.splice(ind, 1);
        res.redirect('/');
    }
    else {
        res.render('/404');
    }
});
router.get("/books/update/:id", function (req, res) {
    var books = bookStore_1.default.books;
    var id = req.params.id;
    var ind = books.findIndex(function (item) { return item.id === id; });
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
router.post("/books/update/:id", file_1.default.single('book'), function (req, res) {
    var books = bookStore_1.default.books;
    var fileBook = "";
    if (req.file) {
        fileBook = req.file.path.replaceAll('\\', '/');
    }
    var _a = req.body, title = _a.title, description = _a.description, authors = _a.authors, favorite = _a.favorite, fileCover = _a.fileCover, fileName = _a.fileName;
    var id = req.params.id;
    var ind = books.findIndex(function (item) { return item.id === id; });
    if (ind !== -1) {
        books[ind] = __assign(__assign({}, books[ind]), { title: title, description: description, authors: authors, favorite: favorite, fileCover: fileCover, fileName: fileName, fileBook: fileBook });
        res.redirect('/');
    }
    else {
        res.redirect('/404');
    }
});
exports.default = router;
