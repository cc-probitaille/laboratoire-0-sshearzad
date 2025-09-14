import { JeuDeDes } from '../../src/core/jeuDeDes';

describe('redemarrerJeu() couvre <=10 et >10', () => {
  it('voit au moins un cas <=10 et un cas >10', () => {
    const jeu = new JeuDeDes();
    let vuLeq10 = false, vuGt10 = false;

    for (let i = 0; i < 2000 && (!vuLeq10 || !vuGt10); i++) {
      JSON.parse(jeu.redemarrerJeu());
      const j: any = jeu; 
      const somme = j._d1.valeur + j._d2.valeur + j._d3.valeur;
      if (somme <= 10) vuLeq10 = true;
      else vuGt10 = true;
    }

    expect(vuLeq10).toBeTruthy();
    expect(vuGt10).toBeTruthy();
  });
});
