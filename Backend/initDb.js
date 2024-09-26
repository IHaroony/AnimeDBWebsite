const mysql = require('mysql2');
const fs = require('fs');

// Create a MySQL connection using Railway's provided environment variables
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,          // Railway-provided variable for MySQL host
  user: process.env.MYSQLUSER,          // Railway-provided variable for MySQL user
  password: process.env.MYSQLPASSWORD,  // Railway-provided variable for MySQL password
  database: process.env.MYSQLDATABASE,  // Railway-provided variable for MySQL database name
  port: process.env.MYSQLPORT || 3306   // Railway-provided variable for MySQL port (with fallback)
});

// Function to initialize the database, create the tables, and insert data
const initializeDatabase = () => {
  
  // Step 1: Create the 'characters' table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS characters (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      abilities TEXT,
      rivalries TEXT,
      friends TEXT,
      backstory TEXT,
      personality_traits TEXT,
      anime VARCHAR(255)
    );
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
      connection.end(); // Ensure the connection is closed in case of an error
      return;
    }
    console.log('Characters table created or already exists');

    // Step 2: Check if the table is empty (indicating it's newly created)
    const checkTableEmptyQuery = 'SELECT COUNT(*) AS count FROM characters';
    
    connection.query(checkTableEmptyQuery, (err, results) => {
      if (err) {
        console.error('Error checking if table is empty:', err);
        connection.end(); // Close the connection on error
        return;
      }

      const rowCount = results[0].count;
      if (rowCount === 0) {
        // Step 3: Load data from anime.json and insert into the database
        fs.readFile('anime.json', 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading anime.json:', err);
            connection.end();
            return;
          }

          let characters;
          try {
            characters = JSON.parse(data); // Parse JSON data
          } catch (jsonErr) {
            console.error('Error parsing anime.json:', jsonErr);
            connection.end();
            return;
          }

          // Build insert values from the parsed JSON
          const insertValues = characters.map(character => {
            return connection.escape([
              character.name,
              character.description,
              character.abilities,
              character.rivalries,
              character.friends,
              character.backstory,
              character.personality_traits,
              character.anime
            ]);
          });

          // Build the SQL insert query
          const insertDataQuery = `
            INSERT INTO characters (name, description, abilities, rivalries, friends, backstory, personality_traits, anime)
            VALUES ?
          `;

          connection.query(insertDataQuery, [insertValues], (err) => {
            if (err) {
              console.error('Error inserting data:', err);
            } else {
              console.log('Data from anime.json inserted successfully');
            }
            connection.end(); // Close the connection after inserting the data
          });
        });
      } else {
        console.log('Table already contains data, skipping insertion');
        connection.end(); // Close the connection if no data insertion is needed
      }
    });
  });
};

// Initialize the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL');
  initializeDatabase(); // Call the function to initialize the database
});
