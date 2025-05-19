const express = require('express');
const router = express.Router();
const receptController = require('../controllers/receptController');

router.get('/', receptController.getAllRecepti);

module.exports = router;