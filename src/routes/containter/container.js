"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var bookRepository_1 = require("../../controllers/bookRepository");
var inversify_1 = require("inversify");
var container = new inversify_1.Container();
container.bind(bookRepository_1.BooksRepository).toSelf();
exports.default = container;
