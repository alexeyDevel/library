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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadBook = exports.deleteBook = exports.updateBook = exports.getBooks = exports.getOneBook = exports.createBook = void 0;
var uuid_1 = require("uuid");
var container_1 = __importDefault(require("../routes/containter/container"));
var bookRepository_1 = require("./bookRepository");
var constans_1 = __importDefault(require("../constans"));
var bookRepository = container_1.default.get(bookRepository_1.BooksRepository);
function createBook(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, title, description, authors, favorite, fileCover, fileName, fileBook, newBook, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, title = _b.title, description = _b.description, authors = _b.authors, favorite = _b.favorite, fileCover = _b.fileCover, fileName = _b.fileName;
                    fileBook = "";
                    if (req.file) {
                        fileBook = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.replaceAll('\\', '/');
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bookRepository.createBook({ id: (0, uuid_1.v4)(), title: title,
                            description: description, authors: authors, favorite: favorite,
                            fileCover: fileCover, fileName: fileName, fileBook: fileBook })];
                case 2:
                    newBook = _c.sent();
                    res.status(201).json(newBook);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    res.status(500).json(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createBook = createBook;
function getOneBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, books, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!id) return [3 /*break*/, 3];
                    return [4 /*yield*/, bookRepository.getBook(id)];
                case 2:
                    books = _a.sent();
                    if (books.length > 0) {
                        res.status(200).json(books);
                    }
                    else {
                        res.status(404).json(constans_1.default.errRespNF);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    res.json(constans_1.default.errRespNF);
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    res.status(500).json(error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getOneBook = getOneBook;
function getBooks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var books, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookRepository.getBooks()];
                case 1:
                    books = _a.sent();
                    res.json(books);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(500).json(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBooks = getBooks;
function updateBook(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var id, _b, title, description, authors, favorite, fileCover, fileName, fileBook, result, error_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = req.params.id;
                    _b = req.body, title = _b.title, description = _b.description, authors = _b.authors, favorite = _b.favorite, fileCover = _b.fileCover, fileName = _b.fileName;
                    fileBook = "";
                    if (req.file) {
                        fileBook = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.replaceAll('\\', '/');
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bookRepository.updateBook({ id: id, title: title, description: description, authors: authors, favorite: favorite, fileCover: fileCover, fileName: fileName, fileBook: fileBook
                        })];
                case 2:
                    result = _c.sent();
                    if (result.matchedCount > 0) {
                        res.status(200).json(result);
                    }
                    else {
                        res.status(404).json(constans_1.default.errRespNF);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _c.sent();
                    res.status(500).json(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateBook = updateBook;
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bookRepository.deleteBook(id)];
                case 2:
                    result = _a.sent();
                    if (result.deletedCount > 0) {
                        res.status(200).json({ msg: 'OK' });
                    }
                    else {
                        res.status(404).json(constans_1.default.errRespNF);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    res.status(500).json(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteBook = deleteBook;
;
function downloadBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, books, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!id) return [3 /*break*/, 3];
                    return [4 /*yield*/, bookRepository.getBook(id)];
                case 2:
                    books = _a.sent();
                    res.download(books[0].fileBook, books[0].fileName, function (err) {
                        if (err) {
                            res.status(500).send({
                                message: "Could not download the file. " + err,
                            });
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    res.status(500).json(constans_1.default.errRespNF);
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_6 = _a.sent();
                    res.status(500).json(error_6);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.downloadBook = downloadBook;
