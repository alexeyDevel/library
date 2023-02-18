"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bookSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('Book', bookSchema);
