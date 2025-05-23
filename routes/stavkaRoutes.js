const express = require('express');
const router = express.Router();
const stavkaController = require('../controllers/stavkaController');
const kolicinaNaSkladistu = require('../middleware/KolicinaNaSkladistu');
const editKolicinaNaSkladistu = require('../middleware/editKolicinaNaSkladistu');

router.post('/:id/delete', stavkaController.deleteStavka);

router.get('/:id/edit', stavkaController.editStavkaForm); 
router.post('/:id/edit', editKolicinaNaSkladistu, stavkaController.updateStavka);

router.get('/new/:receptId', stavkaController.newStavkaForm);
router.post('/new/:receptId', kolicinaNaSkladistu, stavkaController.createStavka);

module.exports = router;