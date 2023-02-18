import express from 'express';
const router = express.Router();
import bookStore from '../store/bookStore';
import fileMulter from "../middleware/file";
import Book from "../components/book/Book";
import { IBook } from '../Interfaces/IBook';
import axios from "axios";
const COUNTER_URL = process.env.COUNTER_URL || "http://localhost:5000";

router.get('/', (req:express.Request, res: express.Response) => {
    const { books } = bookStore;
    res.render("books/index", {
        title: "Books",
        books: books,
    });
});

router.get("/book/create", (req:express.Request, res: express.Response) => {
    res.render("books/create", {
        title: "Create"
    });
});

router.post("/books/createnew", fileMulter.single('book'), (req:express.Request, res: express.Response) => {
    let fileBook:string = "";
    if(req.file){
        fileBook = req.file.path.replaceAll('\\', '/');
    }
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    bookStore.addBook(newBook);
    res.redirect('/');
});

router.get("/books/:id",(req:express.Request, res: express.Response) => {
    const { books } = bookStore;
    const { id } = req.params;
    const ind = books.findIndex((item: IBook) => item.id === id);
    if(ind !== -1){
        res.render('books/view',{
            title: 'View',
            book: books[ind],
        });
    }else{
        res.redirect('/404');
    }
});

router.post("/books/delete/:id",(req:express.Request, res: express.Response) => {
    const { books } = bookStore;
    const { id } = req.params;
    const ind = books.findIndex((item: IBook) => item.id === id);
    if(ind !== -1){
        books.splice(ind, 1);
        res.redirect('/');
    }else{
        res.render('/404');
    }
});

router.get("/books/update/:id", (req:express.Request, res: express.Response) => {
    const { books } = bookStore;
    const { id } = req.params;
    const ind = books.findIndex((item: IBook) => item.id === id);
    if(ind !== -1){
        res.render('books/update',{
            title: 'Update',
            book: books[ind]
        });
    }else {
        res.redirect('/404');
    }
});
router.post("/books/update/:id", fileMulter.single('book'), (req:express.Request, res: express.Response) => {
    const { books } = bookStore;
    let fileBook = "";
    if(req.file){
        fileBook = req.file.path.replaceAll('\\', '/');
    }
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;
    const ind = books.findIndex((item: IBook) => item.id === id);
    if(ind !== -1){
        books[ind] = {
            ...books[ind],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        }
        res.redirect('/');
    }else {
        res.redirect('/404');
    }
});

export default router;