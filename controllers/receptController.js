const pool = require('../config/db');

const getAllRecepti = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Recept"');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Greška prilikom dohvaćanja recepata:', err);
    res.status(500).json({ error: 'Greška na poslužitelju' });
  }
};

module.exports = {
  getAllRecepti,
};