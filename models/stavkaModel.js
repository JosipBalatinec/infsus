const pool = require('../config/db');

//Dohvat stavki za određeni recept_id
async function getStavkeByReceptId(receptId) {
  const result = await pool.query(`
    SELECT sr.stavka_id, sr.kolicina, p.naziv, p.proizvod_id
    FROM "Stavka_recepta" sr
    JOIN "Proizvod" p ON sr.proizvod_id = p.proizvod_id
    WHERE sr.recept_id = $1
  `, [receptId]);

  return result.rows;
}

//Brisanje stavke za određeni stavka_id
async function deleteStavkaById(stavkaId) {
  await pool.query('DELETE FROM "Stavka_recepta" WHERE stavka_id = $1', [stavkaId]);
}

//Dohvat recept_id za određeni stavka_id
async function getReceptIdByStavkaId(stavkaId) {
  const result = await pool.query(
    'SELECT recept_id FROM "Stavka_recepta" WHERE stavka_id = $1',
    [stavkaId]
  );
  return result.rows[0]?.recept_id;
}

//Dohvat stavke za određeni stavka_id
async function getStavkaById(id) {
  const result = await pool.query('SELECT * FROM "Stavka_recepta" WHERE stavka_id = $1', [id]);
  return result.rows[0];
}

//Uređivanje količine za određenu stavku
async function updateStavka(stavkaId, kolicina) {
  await pool.query(
    'UPDATE "Stavka_recepta" SET kolicina = $1 WHERE stavka_id = $2',
    [kolicina, stavkaId]
  );
}

//Dodavanje nove stavke za određeni recept_id
async function insertStavka(receptId, proizvodId, kolicina) {
  await pool.query(
    'INSERT INTO "Stavka_recepta" (recept_id, proizvod_id, kolicina) VALUES ($1, $2, $3)',
    [receptId, proizvodId, kolicina]
  );
}

module.exports = { 
  getStavkeByReceptId,
  deleteStavkaById, 
  getReceptIdByStavkaId, 
  getStavkaById, 
  updateStavka, 
  insertStavka 
};