const kategorijaModel = require("../models/kategorijaModel");

// prikaz svih kategorija
async function showKategorijaList(req, res) {
  const kategorije = await kategorijaModel.getAllKategorija();
  res.render("kategorijeList", { kategorije });
}

async function updateKategorija(req, res) {
  const id = parseInt(req.params.id);
  await kategorijaModel.updateKategorija(id, req.body);
  res.redirect(`/kategorije/update/${id}`);
}

async function deleteKategorija(req, res) {
  const id = parseInt(req.params.id);
  await kategorijaModel.deleteKategorija(id);
  res.redirect("/kategorije");
}

async function searchKategorije(req, res) {
  const searchTerm = req.query.q;
  const kategorije = await kategorijaModel.getKategorijaByName(searchTerm);
  res.render('kategorijeList', { kategorije });
}

async function showEditForm(req, res) {
  const id = parseInt(req.params.id);
  const kategorija = await kategorijaModel.getKategorijaById(id);
  res.render('kategorijaEdit', { kategorija });
}

async function updateKategorija(req, res) {
  const id = parseInt(req.params.id);
  const kategorija_name = req.body.kategorija;
  await kategorijaModel.updateKategorija(id, kategorija_name);
  res.redirect('/kategorije');
}

async function showAddForm(req, res) {
  res.render('kategorijaAdd'); 
}

async function addKategorija(req, res) {
  const kategorijaName = req.body.kategorija;
  await kategorijaModel.insertKategorija(kategorijaName);
  res.redirect('/kategorije');
}

module.exports = {
  showKategorijaList,
  deleteKategorija,
  searchKategorije,
  updateKategorija,
  showEditForm,
  showAddForm,
  addKategorija,
};
