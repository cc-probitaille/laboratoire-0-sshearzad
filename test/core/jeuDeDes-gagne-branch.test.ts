// test/core/jeuDeDes-gagne-branch.test.ts
import { JeuDeDes } from '../../src/core/jeuDeDes';
import 'jest-extended';

describe('JeuDeDes - couverture branche gagne (3 dés, ≤10)', () => {
  it('force v1=3, v2=4, v3=3 → somme=10 → gagné', () => {
    const jdd = new JeuDeDes();

    const d1 = (jdd as any)._d1;
    const d2 = (jdd as any)._d2;
    const d3 = (jdd as any)._d3;

    const s1 = jest.spyOn(d1, 'brasser').mockImplementation(function () { (this as any)._valeur = 3; });
    const s2 = jest.spyOn(d2, 'brasser').mockImplementation(function () { (this as any)._valeur = 4; });
    const s3 = jest.spyOn(d3, 'brasser').mockImplementation(function () { (this as any)._valeur = 3; });

    JSON.parse(jdd.demarrerJeu('Alice'));
    const r = JSON.parse(jdd.jouer('Alice'));

    expect(r.v1).toBe(3);
    expect(r.v2).toBe(4);
    expect(r.v3).toBe(3);
    expect(r.somme).toBe(10);
    expect(String(r.message).toLowerCase()).toContain('gagn');

    s1.mockRestore(); s2.mockRestore(); s3.mockRestore();
  });
});
