import pool from "./clients/db.mysql.js";

(async () => {
  try {

await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

  } catch (err) {
    console.error("error");
  } finally {
    console.log("true");
  }
})();