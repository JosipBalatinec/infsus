const pool = require("../config/db");

// dohvat svih kategorija_id-ova
async function getAllKategorijaId() {
  const result = await pool.query(
    'SELECT kategorija_id FROM "kategorije_lijekova_i_proizvoda" ORDER BY kategorija_id'
  );
  return result.rows.map((row) => row.kategorija_id);
}

// dohvat kategorije po kategorija_id-u
async function getKategorijaById(id) {
  const result = await pool.query(
    'SELECT * FROM "kategorije_lijekova_i_proizvoda" WHERE kategorija_id = $1',
    [id]
  );
  return result.rows[0];
}

// update kategorije
async function updateKategorija(kategorija_id, kategorija_name) {
  await pool.query(
    'UPDATE "kategorije_lijekova_i_proizvoda" SET kategorija = $1 WHERE kategorija_id = $2',
    [kategorija_name, kategorija_id]
  );
}

// delete kategorije
async function deleteKategorija(id) {
  await pool.query(
    'DELETE FROM "kategorije_lijekova_i_proizvoda" WHERE kategorija_id = $1',
    [id]
  );
}

// dohvat svih kategorija
async function getAllKategorija() {
  const result = await pool.query(
    'SELECT * FROM "kategorije_lijekova_i_proizvoda" ORDER BY kategorija_id'
  );
  return result.rows;
}

// dohvat kategorija po imenu
async function getKategorijaByName(name) {
  const result = await pool.query(
    'SELECT * FROM "kategorije_lijekova_i_proizvoda" WHERE kategorija ILIKE $1 ORDER BY kategorija_id',
    [`%${name}%`]
  );
  return result.rows;
}

async function insertKategorija(kategorija_name) {
  await pool.query(
    'INSERT INTO "kategorije_lijekova_i_proizvoda" (kategorija) VALUES ($1)',
    [kategorija_name]
  );
}

module.exports = {
  getAllKategorijaId,
  getAllKategorija,
  getKategorijaById,
  updateKategorija,
  deleteKategorija,
  getKategorijaByName,
  insertKategorija,
};
