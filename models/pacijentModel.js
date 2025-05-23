const pool = require('../config/db');

async function getAllPacijenti() {
  const result = await pool.query('SELECT pacijent_oib, ime, prezime FROM "Pacijent"');
  return result.rows;
}

module.exports = { getAllPacijenti };