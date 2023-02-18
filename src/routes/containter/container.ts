import "reflect-metadata";
import { BooksRepository } from "../../controllers/bookRepository";
import { Container, injectable, inject } from "inversify";

var container = new Container();
container.bind(BooksRepository).toSelf();

export default container;