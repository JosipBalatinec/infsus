const stavkaModel = require('../models/stavkaModel');
const proizvodModel = require('../models/proizvodModel');

//Provjera ima li dovoljno proizvoda na skladištu kod edita
async function checkEditKolicinaNaSkladistu(req, res, next) {
  const stavkaId = parseInt(req.params.id);
  const novaKolicina = parseInt(req.body.kolicina);
  const stavka = await stavkaModel.getStavkaById(stavkaId);
  const proizvod = await proizvodModel.getProizvodById(stavka.proizvod_id);

  if (novaKolicina > proizvod.kolicina_na_skladistu) {
    return res.render('editStavka', {
        stavka: {stavka_id: stavka.stavka_id,
                 recept_id: stavka.recept_id,
                 proizvod_id: stavka.proizvod_id,
                 naziv: proizvod.naziv,
                 kolicina: req.body.kolicina},
        error: `Na skladištu je dostupno samo ${proizvod.kolicina_na_skladistu} kom.`
    });
  }

  req.stavka = stavka;
  req.proizvod = proizvod;
  next();
}

module.exports = checkEditKolicinaNaSkladistu;