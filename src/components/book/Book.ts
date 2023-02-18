import { IBook } from "../../Interfaces/IBook";

import { v4 as uuid } from "uuid";

class Book implements IBook{
    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;    

    constructor(title: string, description: string, authors: string, favorite: string, fileCover: string, fileName: string, fileBook: string) {
        this.id = uuid(),
            this.title = title,
            this.description = description,
            this.authors = authors,
            this.favorite = favorite,
            this.fileCover = fileCover,
            this.fileName = fileName,
            this.fileBook =  fileBook
    }
}

export default Book;