import request from 'supertest';
const appModule: any = require('../../src/app');
const app = appModule.default || appModule.app || appModule;

describe('GET /api/v1/jeu/jouer sans paramètre nom', () => {
  it('renvoie 400 avec un message JSON', async () => {
    const res = await request(app).get('/api/v1/jeu/jouer').expect(400);
    expect(res.type).toMatch(/json/);
    expect(res.body.error).toMatch(/nom/i);
  });
});
