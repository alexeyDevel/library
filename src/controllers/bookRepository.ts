import { IBook } from "../Interfaces/IBook";
import BookModel from "../models/bookModel";
import express from "express";
import { injectable } from "inversify";

// export class Book implements IBook {
    
// }
@injectable()
export class BooksRepository {

    async createBook(book: IBook):Promise<IBook>{
        const newBook = await BookModel.create(book);
       
        return newBook;
    };
    async getBook(id: number): Promise<IBook[]>{
        const book = await BookModel.find({'id': id});

        return book;
    };
    async getBooks(): Promise<IBook[]>{
        const books = await BookModel.find();

        return books;
    };
    async updateBook(book: IBook): Promise<any>{
        const result = await BookModel.updateOne({id:book.id}, {
            title: book.title,
            description: book.description,
            authors:  book.authors,
            favorite: book.favorite,
            fileCover: book.fileCover,
            fileName: book.fileName,
            fileBook: book.fileBook
        });

        return result;
    };
    async deleteBook(id:number): Promise<any>{
        const result = await BookModel.deleteOne({id:id});

        return result;
    };
    async downloadBook(id:number): Promise<IBook[]>{
        const books = await BookModel.find({'id': id});

        return books;
    }
}