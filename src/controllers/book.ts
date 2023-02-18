import { v4 as uuid } from "uuid";
import container from "../routes/containter/container";
import { BooksRepository } from "./bookRepository";
import constans from "../constans"

const bookRepository = container.get(BooksRepository);

export async function createBook(req:any, res:any): Promise<void> {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    let fileBook = "";
    if(req.file){
        fileBook = req.file?.path.replaceAll('\\', '/');
    }
    try {
        const newBook = await bookRepository.createBook({id: uuid(), title: title,
            description:description, authors:authors, favorite:favorite,
            fileCover:fileCover, fileName:fileName, fileBook: fileBook})
        res.status(201).json(newBook);

    } catch (error) {
        res.status(500).json(error);
    }
}

export async function getOneBook(req:any, res:any): Promise<void> {
    const { id } = req.params;
    try {
        if(id){
            const books = await bookRepository.getBook(id);
            if(books.length > 0 ){
                res.status(200).json(books); 
            }else {
                res.status(404).json(constans.errRespNF); 
            }
              
        }else{
            res.json(constans.errRespNF); 
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function getBooks(req:any, res:any): Promise<void> {
    try {
        const books = await bookRepository.getBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function updateBook(req:any, res:any): Promise<void> {
    const { id } = req.params;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    let fileBook = "";
    if(req.file){
        fileBook = req.file?.path.replaceAll('\\', '/');
    }
    try {
        const result = await bookRepository.updateBook({id,
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        });
        if(result.matchedCount > 0 ){
            res.status(200).json(result); 
        }else {
            res.status(404).json(constans.errRespNF); 
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function deleteBook(req:any, res:any): Promise<void> {
        const { id } = req.params;
        try {
            const result = await bookRepository.deleteBook(id);
            if(result.deletedCount > 0){
                res.status(200).json({msg: 'OK'});
            }else{
                res.status(404).json(constans.errRespNF);
            }
            
        } catch (error) {
            res.status(500).json(error);
        }
};

export async function downloadBook(req:any, res:any): Promise<void> {
    const { id } = req.params;
    try {
        if(id){
            const books = await bookRepository.getBook(id);
            res.download(books[0].fileBook, books[0].fileName, (err: any) => {
                if (err) {
                    res.status(500).send({
                        message: "Could not download the file. " + err,
                    });
                }
            });   
        }else{
            res.status(500).json(constans.errRespNF); 
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
}