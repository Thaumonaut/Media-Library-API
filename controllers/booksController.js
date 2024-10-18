const Book = require('../database/bookSchema');

const addBook = async (req, res) => {
    //#swagger.tags=['Books']
    const { title, author, description, releaseYear, pages, ISBN10, ISBN13 } = req.body;
    try {
        const newBook = new Book(req.body); 
        // here is wher mongoose will make its validation
        await newBook.save();
        //succesfull message
        return res.status(201).json({ message: 'Book added successfully!', book: newBook });
    } catch (err) {
        //error message (error handling)
        return res.status(500).json({ message: 'Some error occured while adding the book', error: err.message });
    }
};

const updateBook = async (req, res) =>{
    //#swagger.tags=['Books']
    const { title, author, description, releaseYear, pages, ISBN10, ISBN13 } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(200).json({
            message: 'Book updated successfully!',
            book: updatedBook
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'An error occurred while updating the book',
            error: err.message
        });
    }
};

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        //error message (error handling)
        return res.status(500).json({ message: 'Some error occurred while getting the books', error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const book = await Book.findById(req.params.id); 
        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }
        res.status(200).json(book);
    } catch (err) {
        //error message (error handling)
        return res.status(500).json({ message: 'Some error occurred while getting the book', error: err.message });
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const book = await Book.findByIdAndDelete(req.params.id); 
        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }
        return res.status(200).json({ message: 'Book deleted'});
    } catch (err) {
        //error message (error handling)
        return res.status(500).json({ message: 'Some error occurred while deleting the book', error: err.message });
    }
};



module.exports = {
    addBook,
    updateBook,
    getAll,
    getSingle,
    deleteBook
}