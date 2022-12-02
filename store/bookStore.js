const data = require("../data.json");
const bookStore = {
    books: data,
    addBook: function (book){
        this.books.push(book);
    }
}

module.exports = bookStore;