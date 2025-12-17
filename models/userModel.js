import pool from "../clients/db.mysql.js";

export const createUser = async (id, username, email, hashedPassword) => {
  const [result] = await pool.query(
    `INSERT INTO users (id, username, email, password) VALUES`,
    [id, username, email, hashedPassword]
  );
  return result;
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email`, [email]);
  return rows[0];
};

export const getUserById = async (id) => {
  const [rows] = await pool.query(`SELECT id, username, email FROM users WHERE id = ?`, [id]);
  return rows[0];
};