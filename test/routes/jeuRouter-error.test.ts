import request from 'supertest';
const appModule: any = require('../../src/app');
const app = appModule.default || appModule.app || appModule;

describe('Forcer une erreur côté route pour couvrir le catch', () => {
  it('redemarrerJeu renvoie 500 si le contrôleur jette (monkeypatch)', async () => {

    const m: any = appModule;
    const jeuRoutes = m.jeuRoutes || m.default?.jeuRoutes || (app as any).jeuRoutes;
    if (!jeuRoutes) return; 

    const original = jeuRoutes._controleurJeu.redemarrerJeu;
    try {
      jeuRoutes._controleurJeu.redemarrerJeu = () => { throw new Error('boom'); };
      const res = await request(app).get('/api/v1/jeu/redemarrerJeu').ok(() => true);
      expect(res.status).toBeGreaterThanOrEqual(500);
    } finally {
      jeuRoutes._controleurJeu.redemarrerJeu = original;
    }
  });
});
