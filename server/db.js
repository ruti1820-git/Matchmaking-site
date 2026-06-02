const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'RUTIkav1820',
  database: 'matchmaking'
});

module.exports = pool;