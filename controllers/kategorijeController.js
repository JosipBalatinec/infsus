const kategorijaModel = require('../models/kategorijaModel');

// prikaz svih kategorija
async function showKategorijaList(req, res) {
  const kategorije = await kategorijaModel.getAllKategorija();
  res.render('kategorijeList', { kategorije });
}

module.exports = { showKategorijaList };