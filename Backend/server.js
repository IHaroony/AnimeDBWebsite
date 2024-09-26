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
  host: process.env.MYSQLHOST || 'localhost',   // Use Railway's provided host or fallback to localhost
  user: process.env.MYSQLUSER || 'root',        // Use Railway's provided user or fallback to root
  password: process.env.MYSQLPASSWORD || '',    // Use Railway's provided password or empty string for local dev
  database: process.env.MYSQLDATABASE || 'mydatabase',  // Use Railway's provided DB name or default for local dev
  port: process.env.MYSQLPORT || 3306           // Use Railway's provided port or fallback to 3306
});

// Function to handle MySQL connection
const handleDisconnect = () => {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
    } else {
      console.log('Connected to MySQL');
    }
  });

  connection.on('error', (err) => {
    console.error('MySQL error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('MySQL connection lost, reconnecting...');
      handleDisconnect();  // Reconnect if connection is lost
    } else {
      throw err;
    }
  });
};

// Initialize MySQL connection
handleDisconnect();

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

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
