const express = require('express');
const app = express();
const receptRoutes = require('./routes/receptRoutes');

app.use(express.json());

app.use('/recepti', receptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});