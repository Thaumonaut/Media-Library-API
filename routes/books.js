const express = require('express');
const router = express.Router();
const {getAll, getSingle, addBook, updateBook, deleteBook } = require("../controllers/booksController.js");
const booksValidator = require("../middleware/booksValidation.js");

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