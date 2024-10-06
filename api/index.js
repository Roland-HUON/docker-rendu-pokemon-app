const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');

app.use('/users', userRoutes);
app.use('/pokemons', pokemonRoutes);
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});