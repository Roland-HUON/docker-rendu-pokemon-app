const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const waitPort = require('wait-port');

const app = express();
app.use(bodyParser.json());

const dbConfig = {
  host: 'db',
  user: 'root',
  password: '',
  database: 'pokemon'
};

const waitForDatabase = async () => {
  await waitPort({ host: dbConfig.host, port: 3306 });
};

const connectWithRetry = async () => {
  try {
    await waitForDatabase();
    const connection = mysql.createConnection(dbConfig);
    console.log('Successfully connected to the database');
    return connection;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    console.log('Retrying in 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    return connectWithRetry();
  }
};

connectWithRetry()
  .then(() => {
    app.listen(3000, () => {
      console.log('API running on port 3000');
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });

app.get('/api/pokemons', (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  connection.query('SELECT * FROM pokemon', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
    connection.end();
  });
});

app.get('/api/users', (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
    connection.end();
  });
});