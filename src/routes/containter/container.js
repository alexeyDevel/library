"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bookRepository_1 = require("../../controllers/bookRepository");
var inversify_1 = require("inversify");
var container = new inversify_1.Container();
container.bind(bookRepository_1.BooksRepository).toSelf().inSingletonScope();
exports.default = container;
