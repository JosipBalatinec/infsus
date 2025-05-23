const express = require('express');
const router = express.Router();
const receptController = require('../controllers/receptController');

router.get('/:id', receptController.showRecept);

router.post('/:id/next', receptController.nextRecept);
router.post('/:id/prev', receptController.prevRecept);

router.post('/:id/update', receptController.updateRecept);
router.post('/:id/delete', receptController.deleteRecept);

module.exports = router;