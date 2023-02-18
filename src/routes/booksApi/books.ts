import express from 'express';
import fileMulter from "../../middleware/file";
import { createBook,downloadBook, deleteBook, getBooks, getOneBook, updateBook } from "../../controllers/book";
const router = express.Router();

const COUNTER_URL = process.env.COUNTER_URL || "http://localhost:5000";

router.get("/books/:id", getOneBook);

router.get("/books/:id/download", downloadBook);

router.get("/books", getBooks);

router.post("/books", fileMulter.single('book'), createBook);

router.delete("/books/:id", deleteBook);

router.put("/books/:id", fileMulter.single('book'), updateBook);

export default router;