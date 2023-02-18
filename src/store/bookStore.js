"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = __importDefault(require("../data"));
var bookStore = {
    books: data_1.default,
    addBook: function (book) {
        this.books.push(book);
    }
};
exports.default = bookStore;
