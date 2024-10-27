const request = require('supertest');
const express = require('express');
const movieRoutes = require('../routes/movies'); // Make sure this points to the right routes file
const Movies = require('../database/movieSchema');

const app = express();
app.use(express.json()); // This allows the app to handle JSON requests
app.use('/api/movies', movieRoutes); // Set up the base route for our tests

jest.mock('../database/movieSchema');

describe('Movies API Endpoints', () => {
    describe('GET /api/movies', () => {
        it('should return all movies', async () => {
            const movie = [{
                title: 'Test Movie',
                releaseDate: '2020-01-01',
                description: 'Test description',
                director: 'Test director',
                studio: 'Test studio',
                cast: ['Test cast'],
                genre: 'Test genre',
                rating: 'Test rating',
                duration: 120
            }]
            Movies.find.mockResolvedValue(movie);
            const res = await request(app).get('/api/movies');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(movie)
        });
        it('should handle errors', async () => {
            Movies.find.mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/api/movies');
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Database error');
        });
    });

    describe('GET /api/movies/:id', () => {
        it('should return a single movie', async () => {
            const movie = {
                title: 'Test Movie',
                releaseDate: '2020-01-01',
                description: 'Test description',
                director: 'Test director',
                studio: 'Test studio',
                cast: ['Test cast'],
                genre: 'Test genre',
                rating: 'Test rating',
                duration: 120
            }
            Movies.findById.mockResolvedValue(movie);
            const res = await request(app).get('/api/movies/1');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(movie);
        });

        it('should return 404 if movie not found', async () => {
            Movies.findById.mockResolvedValue(null);
            const res = await request(app).get('/api/movies/9');
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message', 'Movie not found');
        });
        it('should handle errors', async () => {
            Movies.findById.mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/api/movies/1');
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Database error');
        });
    });
});
