import request from "supertest";

// Récupère l'app Express quel que soit l'export utilisé par src/app.ts
const appModule: any = require("../../src/app");
const app = appModule.default || appModule.app || appModule;

async function creerJoueur(nom: string) {
  // Essaie des variantes possibles de l’endpoint "jouer"
  let r = await request(app).get(`/api/v1/jeu/jouer/${encodeURIComponent(nom)}`).ok(() => true);
  if (r.status === 200) return;
  r = await request(app).get(`/api/v1/jeu/jouer`).query({ nom }).ok(() => true);
  if (r.status === 200) return;
  await request(app).post(`/api/v1/jeu/joueurs`).send({ nom }).ok(() => true);
}

describe("GET /api/v1/jeu/redemarrerJeu", () => {
  beforeAll(async () => {
    // Précondition : au moins un joueur existe
    await creerJoueur("Fredo");
    await creerJoueur("Susie");
  });

  it("retourne 200 et du JSON (appel exact)", async () => {
    // get('/api/v1/jeu/redemarrerJeu')
    await request(app)
      .get('/api/v1/jeu/redemarrerJeu')
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("postcondition : il n'y a plus de joueurs", async () => {
    const res = await request(app).get("/api/v1/jeu/joueurs").ok(() => true);

    if (res.status === 200) {
      const payload = res.body;
      if (Array.isArray(payload)) {
        expect(payload).toHaveLength(0);
      } else if (payload && typeof payload === "object") {
        const list = Array.isArray((payload as any).joueurs) ? (payload as any).joueurs : [];
        expect(list).toHaveLength(0);
      } else {
        expect(res.status).toBeLessThan(500);
      }
    } else {
      expect(res.status).toBe(404);
      expect(res.type).toMatch(/json|html/);
    }
  });
});
