import { model, Document, Schema } from 'mongoose';
import { IBook } from '../Interfaces/IBook';

const bookSchema = new Schema<IBook>({
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

export default model<IBook & Document>('Book', bookSchema); 