const express = require('express');
const router = express.Router();
const {getAll, getSingle, addBook, updateBook, deleteBook } = require("../controllers/books.js");
const booksValidator = require("../middleware/books.js");

router.get("/", getAll);

router.get('/:id', getSingle);


router.post('/', 
    booksValidator.validateAddBook,
    booksValidator.checkValidation,
    addBook);

router.put('/:id', 
    booksValidator.validateUpdateBook,
    booksValidator.checkValidation,
    updateBook);

router.delete('/:id', deleteBook);

module.exports = router;