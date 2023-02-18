import express from 'express';
import "reflect-metadata";
import booksRoutesForView from '../routes/booksRouteForView';
import {err404} from '../middleware/error404';
import books from '../routes/booksApi/books';
import auth from '../routes/auth';

const router = express.Router();



router.use('/', booksRoutesForView);


router.use('/api', books);
router.use('/api', auth);
router.use(err404);

export default router;