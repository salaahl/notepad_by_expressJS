const User = require('../models/User.js');
const { db } = require('../data/db.js');

const createTableIfNotExist = (req, res) => {
  const sql_create = `CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    mail VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY(user_id),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NULL
  );`;

  db.run(sql_create, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Mise à jour réussie de la table 'user'");
  });
};

const getUsers = (req, res) => {
  createTableIfNotExist();
  let sql = 'SELECT user_id, email FROM user ORDER BY user_id DESC';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    res.render('users', { title: 'Users', users: rows });
  });
};

const getUser = (req, res) => {
  const stmt = 'SELECT user_id, email FROM user WHERE user_id = ?';
  var params = [req.body.id];

  db.get(stmt, params, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ user: row }));
  });
};

const createUser = (req, res) => {
  const stmt = db.prepare('INSERT INTO user mail, password VALUES (?, ?)');
  stmt.run('exemple@gmail.com', 'Motdepasse');
  stmt.finalize();
  console.log("Alimentation réussie de la table 'user'");
};

const updateUser = (req, res) => {
  let stmt = null;
  let params = null;
  stmt = 'UPDATE user SET title = ?, text = ? WHERE user_id = ?';
  params = [req.body.title, req.body.text, req.body.id];

  db.run(stmt, params, function (err, row) {
    if (err) {
      console.error(err.message);
    }
    console.log("Mise à jour réussie de la table 'user'");
  });
};

const deleteUser = (req, res) => {
  let stmt = 'DELETE FROM user WHERE user_id = ?';
  let params = [req.body.id];

  db.run(stmt, params, function (err, row) {
    if (err) {
      console.error(err.message);
    }
    console.log("Suppression réussie de l'utilisateur");
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
