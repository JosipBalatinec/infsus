const request = require('supertest');
const app = require('../../server');
const pool = require('../../config/db');

describe('Integracijski test za GET /recept/:id', () => {

  beforeAll(async () => {
    await pool.query(`
      INSERT INTO "Recept" (recept_id, pacijent_oib, zaposlenik_id, datum_izdavanja)
      VALUES (999, '12345678901', 2, '2024-05-01')
      ON CONFLICT (recept_id) DO NOTHING
    `);
  });

  afterAll(async () => {
    await pool.query(`DELETE FROM "Recept" WHERE recept_id = 999`);
    await pool.end();
  });

  it('Povrat statusa 200 i ID recepta 999', async () => {
    const res = await request(app).get('/recept/999');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('999');
  });
});