const proizvodModel = require('../models/proizvodModel');

//Provjera ima li dovoljno proizvoda na skladištu kod new
async function checkKolicinaNaSkladistu(req, res, next) {
  const proizvodId = req.body.proizvod_id || req.proizvod_id;
  const trazenaKolicina = parseInt(req.body.kolicina);
  const proizvod = await proizvodModel.getProizvodById(proizvodId);

  if (trazenaKolicina > proizvod.kolicina_na_skladistu) {
    return res.render('newStavka', {
      receptId: req.params.receptId,
      proizvodi: await proizvodModel.getAllProizvodi(),
      error: `Na skladištu je dostupno samo ${proizvod.kolicina_na_skladistu} kom.`
    });
  }

  req.proizvod = proizvod;
  next();
}

module.exports = checkKolicinaNaSkladistu;