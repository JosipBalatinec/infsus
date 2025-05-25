const express = require("express");
const app = express();
const receptRoutes = require("./routes/receptRoutes");
const stavkaRoutes = require("./routes/stavkaRoutes");
const homeController = require("./controllers/homeController");
const kategorijaRoutes = require("./routes/kategorijaRoutes");

const path = require("path");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/recept", receptRoutes);
app.use("/stavka", stavkaRoutes);
app.use("/kategorije", kategorijaRoutes);

app.get("/", homeController.showReceptiList);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
}

module.exports = app;
