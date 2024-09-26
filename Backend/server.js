const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

// Use CORS
app.use(cors());

// Create a MySQL connection using Railway's provided environment variables
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'mydatabase',
  port: process.env.MYSQLPORT || 3306
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

// Listen on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
