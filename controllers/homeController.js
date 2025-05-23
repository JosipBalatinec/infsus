const receptModel = require('../models/receptModel');

//Prikaz svih recepata
async function showReceptiList(req, res) {
  const recepti = await receptModel.getAllRecepti();
  res.render('receptiList', { recepti });
}

module.exports = { showReceptiList };