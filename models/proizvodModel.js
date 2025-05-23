const pool = require('../config/db')

//Dohvat svih proizvoda
async function getAllProizvodi() {
  const result = await pool.query('SELECT proizvod_id, naziv FROM "Proizvod" ORDER BY naziv');
  return result.rows;
}

//Dohvat proizvoda po proizvod_id
async function getProizvodById(id) {
  const result = await pool.query('SELECT * FROM "Proizvod" WHERE proizvod_id = $1', [id]);
  return result.rows[0];
}

module.exports = {
  getAllProizvodi,
  getProizvodById
};