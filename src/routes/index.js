"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var booksRouteForView_1 = __importDefault(require("../routes/booksRouteForView"));
var error404_1 = require("../middleware/error404");
var books_1 = __importDefault(require("../routes/booksApi/books"));
var auth_1 = __importDefault(require("../routes/auth"));
var router = express_1.default.Router();
router.use('/', booksRouteForView_1.default);
router.use('/api', books_1.default);
router.use('/api', auth_1.default);
router.use(error404_1.err404);
exports.default = router;
