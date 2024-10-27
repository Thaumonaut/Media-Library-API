// server.test.js
const request = require('supertest');
const app = require('../src/app'); 

let server;

beforeAll(() => {
  server = app.listen(4000); // Start the server
});

afterAll((done) => {
  server.close(done); // Close the server
});

describe('API Endpoints', () => {
  it('should return 200 for GET /', async () => {
    const res = await request(server).get('/'); 
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('To view docs, visit');
  });

  it('should handle authentication for routes', async () => {
    const res = await request(server).get('/games');
    expect(res.statusCode).toEqual(401);
  });
});