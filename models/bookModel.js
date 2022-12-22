const { model, mongoose } = require('mongoose');

const bookSchema = mongoose.Schema({
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

module.exports = model('Book', bookSchema); 