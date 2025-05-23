const pool = require('../config/db');

//Dohvat recepta prema recept_id
async function getReceptById(id) {
  const result = await pool.query('SELECT * FROM "Recept" WHERE recept_id = $1', [id]);
  return result.rows[0];
}

//Dohvat svih recept_id-ova
async function getAllReceptIds() {
  const result = await pool.query('SELECT recept_id FROM "Recept" ORDER BY recept_id');
  return result.rows.map(row => row.recept_id);
}   

//Update recepta
async function updateRecept(id, data) {
  const { datum_izdavanja, pacijent_oib, zaposlenik_id } = data;
  await pool.query(
    'UPDATE "Recept" SET datum_izdavanja = $1, pacijent_oib = $2, zaposlenik_id = $3 WHERE recept_id = $4',
    [datum_izdavanja, pacijent_oib, zaposlenik_id, id]
  );
}

//Brisanje recepta
async function deleteRecept(id) {
  await pool.query('DELETE FROM "Recept" WHERE recept_id = $1', [id]);
}

//Provjera postoji li recept s određenim recept_id
//async function existsRecept(id) {
//  const result = await pool.query('SELECT 1 FROM "Recept" WHERE recept_id = $1', [id]);
//  return result.rowCount > 0;
//}

//Dohvat svih recepata
async function getAllRecepti() {
  const result = await pool.query('SELECT * FROM "Recept" ORDER BY recept_id');
  return result.rows;
}

module.exports = { 
  getReceptById, 
  getAllReceptIds, 
  updateRecept, 
  deleteRecept, 
  //existsRecept, 
  getAllRecepti 
};