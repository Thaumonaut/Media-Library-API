const request = require('supertest');
const express = require('express');
const gamesRoutes = require('../routes/games');
const { Game } = require('../database/gameSchema');

const app = express();
app.use(express.json());
app.use('/api/games', gamesRoutes);

jest.mock('../database/gameSchema', () => ({
  Game: {
    find: jest.fn(),
    findById: jest.fn(),
  },
}));

describe('Game API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/games', () => {
    it('should return all games in the database', async () => {
      const games = [
        { _id: '12345', title: 'Test Game', developer: 'Test Developer' },
        { _id: '67890', title: 'Another Test Game', developer: 'Another Developer' },
      ];
      Game.find.mockResolvedValue(games);
      const response = await request(app).get('/api/games');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(games);
    });

    it('should handle errors', async () => {
      Game.find.mockRejectedValue(new Error('Database error'));
      const response = await request(app).get('/api/games');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Database error');
    });
  });

  describe('GET /api/games/:id', () => {
    it('should return one game from the database by id', async () => {
      const game = { _id: '12345', title: 'Test Game', developer: 'Test Developer' };
      Game.findById.mockResolvedValue(game);
      const response = await request(app).get('/api/games/12345');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(game);
    });

    it('should return 404 if the game does not exist', async () => {
      Game.findById.mockResolvedValue(null);
      const response = await request(app).get('/api/games/99999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Game not found');
    });

    it('should handle errors', async () => {
      Game.findById.mockRejectedValue(new Error('Database error'));
      const response = await request(app).get('/api/games/12345');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Database error');
    });
  });
});
