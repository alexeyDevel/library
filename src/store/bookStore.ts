import data from "../data";
import { IBook } from "../Interfaces/IBook";

const bookStore = {
    books: data,
    addBook: function (book:IBook){
        this.books.push(book);
    }
}

export default bookStore;