const request = require('supertest');
const express = require('express');
const booksRoutes = require('../routes/books'); 
const Book = require('../database/bookSchema');

const app = express();
app.use(express.json()); 
app.use('/api/books', booksRoutes);

jest.mock('../database/bookSchema');
describe('Books API Endpoints', () => {
    //tests for get all books
    describe('GET /api/books', () => {
        it('should return all books in the database', async () => {
            const books = [
                { 
                    _id: '1', 
                    title: "Title 1",
                    author: "Author 1", 
                    description: "Description 1.", 
                    releaseYear: "1910",
                    pages: 300,
                    ISBN10: "1111111111",
                    ISBN13: "1111111111111",
                },
                { 
                    _id: '2', 
                    title: "Title 2",
                    author: "Author 2", 
                    description: "Description 2.", 
                    releaseYear: "1910",
                    pages: 300,
                    ISBN10: "1111111111",
                    ISBN13: "1111111111111",
                }
            ];
            Book.find.mockResolvedValue(books);
            const response = await request(app).get('/api/books');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(books);
        });

        it('should handle errors', async () => {
            Book.find.mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/api/books');
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Some error occurred while getting the books');
        });
    });

    // Tests for get single book
    describe('GET /api/books/:id', () => {
        it('should return one book from the database, by id', async () => {
            const book = 
            { 
                _id: '1', 
                title: "Title 1",
                author: "Author 1", 
                description: "Description 1.", 
                releaseYear: "1910",
                pages: 300,
                ISBN10: "1111111111",
                ISBN13: "1111111111111",
            };
            Book.findById.mockResolvedValue(book);
            const response = await request(app).get('/api/books/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(book);
        });
        it('should return 404 if the book not exist', async () => {
            Book.findById.mockResolvedValue(null);
            const response = await request(app).get('/api/books/999');
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Book not found.');
        });
        it('should handle errors', async () => {
            Book.findById.mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/api/books/1');
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Some error occurred while getting the book');
        });
    });
});