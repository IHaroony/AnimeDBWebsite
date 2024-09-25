const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

// Create an Express app
const app = express();
const port = 3000;

// Use CORS
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME 
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define a route to fetch data from the MySQL database
app.get('/characters', (req, res) => {
  const query = 'SELECT * FROM characters';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching characters:', error);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});

// Listen on port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
