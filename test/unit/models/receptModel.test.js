const receptModel = require('../../../models/receptModel');

test('Dohvat recepta po ID-u', async () => {
  const recept = await receptModel.getReceptById(1);
  expect(recept).toHaveProperty('recept_id', 1);
});