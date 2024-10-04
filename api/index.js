const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');

app.use('/api', userRoutes);
app.use('/api', pokemonRoutes);
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});