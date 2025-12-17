import pool from "../clients/db.mysql.js";

export const createTask = async (task) => {
  const { id, userId, title, description, taskDate } = task;
  const [result] = await pool.query(
    `INSERT INTO tasks (id, userId, title, description, taskDate) VALUES (?, ?, ?, ?, ?)`,
    [id, userId, title, description, taskDate]
  );
  return result;
};

export const getTasksByUser = async (userId, offset, limit) => {
  const [tasks] = await pool.query(
    `SELECT * FROM tasks WHERE userId = ? ORDER BY taskDate ASC LIMIT ? OFFSET ?`,
    [userId, limit, offset]
  );
  const [[{ count }]] = await pool.query(
    `SELECT COUNT(*) AS count FROM tasks WHERE userId = ?`,
    [userId]
  );
  return { tasks, count };
};

export const getTaskById = async (id, userId) => {
  const [rows] = await pool.query(`SELECT * FROM tasks WHERE id = ? AND userId = ?`, [id, userId]);
  return rows[0];
};

export const updateTask = async (id, userId, updates) => {
  const { title, description, completed, taskDate } = updates;
  await pool.query(
    `UPDATE tasks SET title=?, description=?, completed=?, taskDate=? WHERE id=? AND userId=?`,
    [title, description, completed, taskDate, id, userId]
  );
};

export const deleteTask = async (id, userId) => {
  await pool.query(`DELETE FROM tasks WHERE id=? AND userId=?`, [id, userId]);
};

export const countTasksByDate = async (userId, date) => {
  const [[{ count }]] = await pool.query(
    `SELECT COUNT(*) AS count FROM tasks WHERE userId=? AND taskDate=?`,
    [userId, date]
  );
  return count;
};