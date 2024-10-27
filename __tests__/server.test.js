// server.test.js
const request = require('supertest');
const app = require('../src/app'); // Agora importando de app.js

let server;

beforeAll(() => {
  server = app.listen(4000); // Inicia o servidor para testes
});

afterAll((done) => {
  server.close(done); // Encerra o servidor após os testes
});

describe('API Endpoints', () => {
  it('should return 200 for GET /', async () => {
    const res = await request(server).get('/'); // Usa `server` ao invés de `app`
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('To view docs, visit');
  });

  it('should handle authentication for routes', async () => {
    const res = await request(server).get('/games'); // Usa `server` ao invés de `app`
    expect(res.statusCode).toEqual(401);
  });
});