"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Book = /** @class */ (function () {
    function Book(title, description, authors, favorite, fileCover, fileName, fileBook) {
        this.id = (0, uuid_1.v4)(),
            this.title = title,
            this.description = description,
            this.authors = authors,
            this.favorite = favorite,
            this.fileCover = fileCover,
            this.fileName = fileName,
            this.fileBook = fileBook;
    }
    return Book;
}());
exports.default = Book;
