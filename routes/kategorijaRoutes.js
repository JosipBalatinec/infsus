const express = require("express");
const router = express.Router();
const kategorijaController = require("../controllers/kategorijeController");

router.get("/", kategorijaController.showKategorijaList);
router.get("/search", kategorijaController.searchKategorije);
router.get('/edit/:id', kategorijaController.showEditForm);
router.get('/add', kategorijaController.showAddForm);

router.post('/add', kategorijaController.addKategorija);
router.post('/delete/:id', kategorijaController.deleteKategorija);
router.post('/edit/:id', kategorijaController.updateKategorija);

module.exports = router;
