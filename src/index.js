const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pg = require('pg').Pool;

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || ''

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pool = new pg({
    connectionString: DATABASE_URL
});

app.get('/', (req, res) => {
    pool.query('SELECT MESSAGE, CREATED_AT FROM MESSAGE ORDER BY CREATED_AT DESC', (error, results) => {
      if (error)
          throw error;

      res.json(results.rows);
    });
});

app.post('/', (req, res) => {
    pool.query('INSERT INTO MESSAGE (message) VALUES ($1)', [req.body.message], (error, results) => {
      if (error)
          throw error;
      
      res.sendStatus(200);  
    });
});

app.listen(PORT);
