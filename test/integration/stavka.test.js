const request = require('supertest');
const app = require('../../server'); 
const pool = require('../../config/db');

describe('POST /stavka/new/:receptId', () => {
  let testReceptId = 1000;
  let testProizvodId = 500;
  let createdStavkaId;

  beforeAll(async () => {
    await pool.query(`
      INSERT INTO "Pacijent" (pacijent_oib, ime, prezime, datum_rodenja)
      VALUES ('99999999999', 'Test', 'Pacijent', '2000-01-01')
      ON CONFLICT DO NOTHING;
    `);
    await pool.query(`
      INSERT INTO "Korisnik" (korisnik_id, ime, prezime, lozinka, email)
      VALUES (500, 'Test', 'Zaposlenik', 'lozinka', 'zaposlenik@test.com')
      ON CONFLICT DO NOTHING;
    `);
    await pool.query(`
      INSERT INTO "Zaposlenik" (zaposlenik_id, broj_licence, radno_vrijeme)
      VALUES (500, 'ABC123', '08:00-16:00')
      ON CONFLICT DO NOTHING;
    `);
    await pool.query(`
      INSERT INTO "Proizvod" (proizvod_id, naziv, cijena, kolicina_na_skladistu, proizvodac)
      VALUES ($1, 'Test Proizvod', 5.00, 100, 'Test')
      ON CONFLICT DO NOTHING
    `, [testProizvodId]);

    await pool.query(`
      INSERT INTO "Recept" (recept_id, pacijent_oib, zaposlenik_id, datum_izdavanja)
      VALUES ($1, '99999999999', 500, '2024-05-23')
      ON CONFLICT DO NOTHING
    `, [testReceptId]);
  });

  afterAll(async () => {
    if (createdStavkaId) {
      await pool.query('DELETE FROM "Stavka_recepta" WHERE stavka_id = $1', [createdStavkaId]);
    }
    await pool.query('DELETE FROM "Recept" WHERE recept_id = $1', [testReceptId]);
    await pool.query('DELETE FROM "Proizvod" WHERE proizvod_id = $1', [testProizvodId]);
    await pool.query('DELETE FROM "Zaposlenik" WHERE zaposlenik_id = 500');
    await pool.query('DELETE FROM "Korisnik" WHERE korisnik_id = 500');
    await pool.query(`DELETE FROM "Pacijent" WHERE pacijent_oib = '99999999999'`);
    await pool.end();
  });

  it('Dodavanje nove stavke', async () => {
    const response = await request(app)
      .post(`/stavka/new/${testReceptId}`)
      .send({ proizvod_id: testProizvodId, kolicina: 1 });

    expect(response.statusCode).toBe(302);

    const result = await pool.query(`
      SELECT * FROM "Stavka_recepta"
      WHERE recept_id = $1 AND proizvod_id = $2
    `, [testReceptId, testProizvodId]);

    expect(result.rowCount).toBeGreaterThan(0);
    createdStavkaId = result.rows[0].stavka_id;
  });
});