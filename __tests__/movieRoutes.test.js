const request = require('supertest');
const app = require('../../app');

describe('GET /movies', () => {
    it('should return all movies', async () => {
        const res = await request(app).get('/movies');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                title: expect.any(String),
                releaseDate: expect.any(String),
                description: expect.any(String),
                director: expect.any(String),
                studio: expect.any(String),
                cast: expect.arrayContaining([expect.any(String)]),
                genre: expect.any(String),
                rating: expect.any(String),
                duration: expect.any(Number)
            })
        ]));
    });
});

describe('GET /movies/:id', () => {
    it('should return a single movie', async () => {
        const res = await request(app).get('/movies/5f5f5f5f5f5f5f5f5f5f5f5');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining({
            title: expect.any(String),
            releaseDate: expect.any(String),
            description: expect.any(String),
            director: expect.any(String),
            studio: expect.any(String),
            cast: expect.arrayContaining([expect.any(String)]),
            genre: expect.any(String),
            rating: expect.any(String),
            duration: expect.any(Number)
        }));
    });

    it('should return 404 if movie not found', async () => {
        const res = await request(app).get('/movies/1234567890abcdef');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ message: 'Movie not found' });
    });
});

describe('POST /movies', () => {
    it('should create a new movie', async () => {
        const res = await request(app)
            .post('/movies')
            .send({
                title: 'Test Movie',
                releaseDate: '2022-01-01',
                description: 'Test movie description',
                director: 'Test Director',
                studio: 'Test Studio',
                cast: ['Test Actor 1', 'Test Actor 2'],
                genre: 'Test Genre',
                rating: 'Test Rating',
                duration: 120
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(expect.objectContaining({
            title: 'Test Movie',
            releaseDate: '2022-01-01',
            description: 'Test movie description',
            director: 'Test Director',
            studio: 'Test Studio',
            cast: expect.arrayContaining(['Test Actor 1', 'Test Actor 2']),
            genre: 'Test Genre',
            rating: 'Test Rating',
            duration: 120
        }));
    });

    it('should return 400 if request body is invalid', async () => {
        const res = await request(app)
            .post('/movies')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ message: 'Invalid request body' });
    });
});

describe('PUT /movies/:id', () => {
    it('should update an existing movie', async () => {
        const res = await request(app)
            .put('/movies/5f5f5f5f5f5f5f5f5f5f5f5')
            .send({
                title: 'Updated Test Movie',
                releaseDate: '2022-01-02',
                description: 'Updated test movie description',
                director: 'Updated Test Director',
                studio: 'Updated Test Studio',
                cast: ['Updated Test Actor 1', 'Updated Test Actor 2'],
                genre: 'Updated Test Genre',
                rating: 'Updated Test Rating',
                duration: 150
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining({
            title: 'Updated Test Movie',
            releaseDate: '2022-01-02',
            description: 'Updated test movie description',
            director: 'Updated Test Director',
            studio: 'Updated Test Studio',
            cast: expect.arrayContaining(['Updated Test Actor 1', 'Updated Test Actor 2']),
            genre: 'Updated Test Genre',
            rating: 'Updated Test Rating',
            duration: 150
        }));
    });

    it('should return 404 if movie not found', async () => {
        const res = await request(app).put('/movies/1234567890abcdef');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ message: 'Movie not found' });
    });

    it('should return 400 if request body is invalid', async () => {
        const res = await request(app)
            .put('/movies/5f5f5f5f5f5f5f5f5f5f5f5')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ message: 'Invalid request body' });
    });
});

describe('DELETE /movies/:id', () => {
    it('should delete a movie', async () => {
        const res = await request(app).delete('/movies/5f5f5f5f5f5f5f5f5f5f5f5');
        expect(res.statusCode).toEqual(204);
    });

    it('should return 404 if movie not found', async () => {
        const res = await request(app).delete('/movies/1234567890abcdef');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ message: 'Movie not found' });
    });
});
