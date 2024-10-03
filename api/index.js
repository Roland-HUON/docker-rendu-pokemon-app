// Express server for API
const express = require('express');
// CORS
const cors = require('cors');
// Body parser
const bodyParser = require('body-parser');
const app = express();
const port = 80;

app.use(cors());
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});