const checkKolicina = require('../../../middleware/editKolicinaNaSkladistu');
const httpMocks = require('node-mocks-http');

test('Unos veće količine od dostupne', async () => {
  const req = httpMocks.createRequest({
    params: { id: 1 },
    body: { kolicina: 999 },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  await checkKolicina(req, res, next);
  
  expect(res._getRenderView()).toBe('editStavka');
});