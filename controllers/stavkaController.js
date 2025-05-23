const stavkaModel = require('../models/stavkaModel');
const proizvodModel = require('../models/proizvodModel');

//Brisanje stavke
async function deleteStavka(req, res) {
  const stavkaId = req.params.id;
  const receptId = await stavkaModel.getReceptIdByStavkaId(stavkaId);

  try {
    await stavkaModel.deleteStavkaById(stavkaId);
    res.redirect(`/recept/${receptId}`);
  } catch (err) {
    console.error('Greška prilikom brisanja stavke:', err);
  }
}

//Dohvat forme za uređivanje stavke
async function editStavkaForm(req, res) {
  const stavkaId = req.params.id;
  const stavka = await stavkaModel.getStavkaById(stavkaId);

  const proizvod = await proizvodModel.getProizvodById(stavka.proizvod_id);

  stavka.naziv = proizvod.naziv;

  res.render('editStavka', { stavka });
}

//Update količine stavke
async function updateStavka(req, res) {
  const stavkaId = req.params.id;
  const { kolicina } = req.body;

  const receptId = await stavkaModel.getReceptIdByStavkaId(stavkaId);

  await stavkaModel.updateStavka(stavkaId, kolicina);

  res.redirect(`/recept/${receptId}`);
}

//Dohvat forme za novu stavku
async function newStavkaForm(req, res) {
  const receptId = req.params.receptId;
  const proizvodi = await proizvodModel.getAllProizvodi();

  res.render('newStavka', { receptId, proizvodi });
}

//Stvaranje nove stavke
async function createStavka(req, res) {
  const receptId = req.params.receptId;
  const { proizvod_id, kolicina } = req.body;

  await stavkaModel.insertStavka(receptId, proizvod_id, kolicina);

  res.redirect(`/recept/${receptId}`);
}

module.exports = { 
  deleteStavka, 
  editStavkaForm, 
  updateStavka, 
  newStavkaForm, 
  createStavka
};