const express = require("express");
const router = express.Router();
const kategorijaController = require("../controllers/kategorijeController");

router.get("/", kategorijaController.showKategorijaList);

module.exports = router;
