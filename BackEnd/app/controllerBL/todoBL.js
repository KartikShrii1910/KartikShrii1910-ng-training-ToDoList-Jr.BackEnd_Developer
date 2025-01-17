const db = require('../config/db');

const TodoBL = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM todos ORDER BY id DESC';
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = 'SELECT * FROM todos WHERE id = ?';
    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = 'INSERT INTO todos (assignedTo, status, dueDate, priority, description) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [data.assignedTo, data.status, data.dueDate, data.priority, data.description], callback);
  },

  updateById: (id, data, callback) => {
    const sql = 'UPDATE todos SET assignedTo = ?, status = ?, dueDate = ?, priority = ?, description = ? WHERE id = ?';
    db.query(sql, [data.assignedTo, data.status, data.dueDate, data.priority, data.description, id], callback);
  },

  deleteById: (id, callback) => {
    const sql = 'DELETE FROM todos WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = TodoBL;
