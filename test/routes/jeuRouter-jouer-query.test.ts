import request from 'supertest';
const appModule: any = require('../../src/app');
const app = appModule.default || appModule.app || appModule;

describe('GET /api/v1/jeu/jouer?nom=...', () => {
  const nom = 'BranchQuery';

  beforeAll(async () => {
    await request(app).post('/api/v1/jeu/demarrerJeu').send({ nom }).expect(201);
  });

  it('accepte aussi la variante avec paramètre de requête', async () => {
    const res = await request(app)
      .get('/api/v1/jeu/jouer')
      .query({ nom })
      .expect('Content-Type', /json/)
      .expect(200);

    const body = res.body || {};
    const resultat = body.resultat ? JSON.parse(body.resultat) : body;
    expect(resultat.nom).toBe(nom);
    expect(resultat.v1).toBeGreaterThanOrEqual(1);
    expect(resultat.v1).toBeLessThanOrEqual(6);
  });
});
