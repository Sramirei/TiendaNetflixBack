const { connection } = require('../DataBase/db');

exports.getAllNetflixAccount = (req, res, next) => {
  const sql = 'SELECT * FROM netflix ORDER BY id DESC';
  connection.query(sql, (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send('No account found.');
      next();
    }
  });
};

exports.getOneNetflixAccount = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM netflix WHERE id = ${id} ORDER BY id DESC`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).send('No account found.');
      next();
    }
  });
};

exports.createdNetflixAccount = async (req, res, next) => {
  try {
    const { correo, contrasena, pantalla, usado } = req.body;

    // Proceed to create the account without checking if the email already exists
    const createNetflixAccountQuery =
      'INSERT INTO netflix (correo, contrasena, pantalla, usado) VALUES (?, ?, ?, ?)';
    const createNetflixAccountValues = [
      correo,
      contrasena,
      pantalla,
      usado
    ];

    connection.query(createNetflixAccountQuery, createNetflixAccountValues, (error, results) => {
      if (error) {
        console.error('Error inserting Netflix Account: ', error);
        res.status(500).send('Server error');
        return;
      }
      res.send('Netflix Account created successfully');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};


exports.updateNetflixAccount = async (req, res, next) => {
  const { id } = req.params;

  const {
    correo,
    contrasena,
    pantalla,
    usado
  } = req.body;

  try {

    const sql = `UPDATE netflix SET correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), pantalla = IFNULL(?, pantalla), usado = IFNULL(?, usado) WHERE id = ?`;
    const values = [
    correo,
    contrasena,
    pantalla,
    usado,
    id
    ];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error updating Netflix Account: ', error);
        res.status(500).send('Error en el server');
        return;
      }
      res.send('Netflix Account updated successfully');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error)).status(500);
    console.error(error);
    next(error);
  }
};

exports.deleteNetflixAccount = (req, res, next) => {
  try {
    const { id } = req.params;
  const sql = `DELETE FROM netflix WHERE id = ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Delete Netflix Account');
  });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error)
    next(error);
  }
}