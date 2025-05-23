const receptModel = require('../models/receptModel');
const pacijentModel = require('../models/pacijentModel');
const zaposlenikModel = require('../models/zaposlenikModel');
const stavkaModel = require('../models/stavkaModel');

//Dohvat recepta prema recept_id
async function showRecept(req, res) {
  const receptId = parseInt(req.params.id);
  allIds = await receptModel.getAllReceptIds();

  const recept = await receptModel.getReceptById(receptId);
  if (!recept) return res.status(404).send('Recept nije pronađen');

  const pacijenti = await pacijentModel.getAllPacijenti();
  const zaposlenici = await zaposlenikModel.getAllZaposlenici();
  const stavke = await stavkaModel.getStavkeByReceptId(receptId);

  res.render('recept', {
    recept,
    pacijenti,
    zaposlenici,
    stavke,
    disablePrev: getPrevId(receptId, allIds) === null,
    disableNext: getNextId(receptId, allIds) === null
  });
}

//Dohvat idućeg recepta
async function nextRecept(req, res) {
  const currentId = parseInt(req.params.id);
  allIds = await receptModel.getAllReceptIds();
  const nextId = getNextId(currentId, allIds);
  if (nextId) {
    res.redirect(`/recept/${nextId}`);
  } else {
    res.redirect(`/recept/${currentId}`);
  }
}

//Dohvat prethodnog recepta
async function prevRecept(req, res) {
  const currentId = parseInt(req.params.id);
  allIds = await receptModel.getAllReceptIds();
  const prevId = getPrevId(currentId, allIds);
  if (prevId) {
    res.redirect(`/recept/${prevId}`);
  } else {
    res.redirect(`/recept/${currentId}`);
  }
}

//Update recepta
async function updateRecept(req, res) {
  const id = parseInt(req.params.id);
  await receptModel.updateRecept(id, req.body);
  res.redirect(`/recept/${id}`);
}

//Brisanje recepta
async function deleteRecept(req, res) {
  const id = parseInt(req.params.id);

  const allIds = await receptModel.getAllReceptIds();
  const prevId = getPrevId(id, allIds);
  const nextId = getNextId(id, allIds);

  await receptModel.deleteRecept(id);

  if (prevId !== null) {
    res.redirect(`/recept/${prevId}`);
  } else if (nextId !== null) {
    res.redirect(`/recept/${nextId}`);
  } else {
    res.redirect('/');
  }
}

//Dohvat recept_id koji slijedi nakon trenutnog
function getNextId(currentId, allIds) {
  const index = allIds.indexOf(currentId);
  if (index !== -1 && index < allIds.length - 1) {
    return allIds[index + 1];
  }
  return null;
}

//Dohvat recept_id koji prethodi trenutnom
function getPrevId(currentId, allIds) {
  const index = allIds.indexOf(currentId);
  if (index > 0) {
    return allIds[index - 1];
  }
  return null;
}

//Svi recepti
async function showAll(req, res) {
  const recepti = await receptModel.getAllRecepti();
  res.render('receptiList', { recepti });
}

module.exports = {
  showRecept,
  nextRecept,
  prevRecept,
  updateRecept,
  deleteRecept,
  showAll
};