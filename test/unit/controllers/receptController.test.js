const receptController = require('../../../controllers/receptController');
const receptModel = require('../../../models/receptModel');

jest.mock('../../../models/receptModel');

describe('receptController.showAll', () => {
  it('Render stranice s receptima', async () => {
    const req = {};
    const res = {
      render: jest.fn()
    };

    const mockRecepti = [
      { recept_id: 1, datum_izdavanja: '2024-01-01', pacijent_oib: '123', zaposlenik_id: 2 },
      { recept_id: 2, datum_izdavanja: '2024-02-01', pacijent_oib: '456', zaposlenik_id: 3 }
    ];

    receptModel.getAllRecepti.mockResolvedValue(mockRecepti);

    await receptController.showAll(req, res);

    expect(res.render).toHaveBeenCalledWith('receptiList', { recepti: mockRecepti });
  });
});