import 'jest-extended';
import { JeuDeDes } from '../../src/core/jeuDeDes';

describe('JeuDeDesTest', () => {
  let jdd: JeuDeDes;

  beforeEach(() => {
    jdd = new JeuDeDes();
  });

  it(`devrait n'avoir aucun joueur au début`, () => {
    expect(jdd.joueurs).toEqual("[]");
  });

  // 3 dés ⇒ somme entre 3 et 18
  it('devrait retourner une valeur entre 3 et 18', () => {
    for (let i = 0; i < 200; i++) {
      expect(jdd.brasser()).toBeWithin(3, 19);
    }
  });

  // On veut voir toutes les valeurs 3..18 (16 valeurs)
  // Probabilité faible pour certaines valeurs ⇒ plus d’essais
  it('devrait retourner finalement toutes les valeurs entre 3 et 18', () => {
    const resultats = new Set<number>();
    for (let i = 0; i < 2000; i++) {
      resultats.add(jdd.brasser());
    }
    expect(resultats.size).toBe(16);
    for (let v = 3; v <= 18; v++) {
      expect(resultats.has(v)).toBeTrue();
    }
    // cas impossibles
    expect(resultats.has(2)).toBeFalse();
    expect(resultats.has(19)).toBeFalse();
  });
});
