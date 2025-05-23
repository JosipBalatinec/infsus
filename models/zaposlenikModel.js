const pool = require('../config/db');

async function getAllZaposlenici() {
  const result = await pool.query('SELECT zaposlenik_id FROM "Zaposlenik"');
  return result.rows;
}

module.exports = { getAllZaposlenici };