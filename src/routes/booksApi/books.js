"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var file_1 = __importDefault(require("../../middleware/file"));
var book_1 = require("../../controllers/book");
var router = express_1.default.Router();
var COUNTER_URL = process.env.COUNTER_URL || "http://localhost:5000";
router.get("/books/:id", book_1.getOneBook);
router.get("/books/:id/download", book_1.downloadBook);
router.get("/books", book_1.getBooks);
router.post("/books", file_1.default.single('book'), book_1.createBook);
router.delete("/books/:id", book_1.deleteBook);
router.put("/books/:id", file_1.default.single('book'), book_1.updateBook);
exports.default = router;
