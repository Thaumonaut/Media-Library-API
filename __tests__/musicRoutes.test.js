const request = require('supertest');
const express = require('express');
const musicRoutes = require('../routes/music'); // Make sure this points to the right routes file
const Music = require('../database/musicSchema');

const app = express();
app.use(express.json()); // This allows the app to handle JSON requests
app.use('/api/music', musicRoutes); // Set up the base route for our tests

// Mocking the Music model
jest.mock('../database/musicSchema');

describe('Music API Endpoints', () => {
    // Tests for GET /api/music
    describe('GET /api/music', () => {
        it('should return all songs', async () => {
            const songs = [
                { _id: '1', artist: 'Artist 1', album: 'Album 1', song: 'Song 1', genre: 'Pop', explicit: false },
                { _id: '2', artist: 'Artist 2', album: 'Album 2', song: 'Song 2', genre: 'Rock', explicit: true }
            ];
            Music.find.mockReturnValue({
                exec: jest.fn().mockResolvedValue(songs)
            });

            const response = await request(app).get('/api/music');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(songs);
        });

        it('should handle errors', async () => {
            Music.find.mockReturnValue({
                exec: jest.fn().mockRejectedValue(new Error('Database error'))
            });

            const response = await request(app).get('/api/music');
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Failed to load music collection');
        });
    });

    // Tests for GET /api/music/:id
    describe('GET /api/music/:id', () => {
        it('should return a single song by id', async () => {
            const song = { _id: '1', artist: 'Artist 1', album: 'Album 1', song: 'Song 1', genre: 'Pop', explicit: false };
            Music.findById.mockResolvedValue(song);

            const response = await request(app).get('/api/music/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(song);
        });

        it('should return 404 if the song does not exist', async () => {
            Music.findById.mockResolvedValue(null);

            const response = await request(app).get('/api/music/999');
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Song not found');
        });

        it('should handle errors', async () => {
            Music.findById.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/music/1');
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Failed to load music collection');
        });
    });
});
