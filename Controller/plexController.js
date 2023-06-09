const { connection } = require('../DataBase/db');

exports.getAllPlexAccounts = (req, res, next) => {
  const sql = 'SELECT * FROM plex ORDER BY id DESC';
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

exports.getOnePlexAccount = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM plex WHERE id = ${id} ORDER BY id DESC`;
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


exports.createPlexAccount = async (req, res, next) => {
  try {
    const { correo, contrasena, pantalla, usado } = req.body;

    // Proceed to create the account without checking if the email already exists
    const createPlexAccountQuery =
      'INSERT INTO plex (correo, contrasena, pantalla, usado) VALUES (?, ?, ?, ?)';
    const createPlexAccountValues = [correo, contrasena, pantalla, usado];

    connection.query(
      createPlexAccountQuery,
      createPlexAccountValues,
      (error, results) => {
        if (error) {
          console.error('Error inserting Plex Account: ', error);
          res.status(500).send('Server error');
          return;
        }
        res.send('Plex Account created successfully');
      }
    );
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};


exports.updatePlexAccount = async (req, res, next) => {
  const { id } = req.params;
  const { correo, contrasena, pantalla, usado } = req.body;

  try {
    const sql = `UPDATE plex SET correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), pantalla = IFNULL(?, pantalla), usado = IFNULL(?, usado) WHERE id = ?`;
    const values = [correo, contrasena, pantalla, usado, id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error updating Plex Account: ', error);
        res.status(500).send('Server error');
        return;
      }
      res.send('Plex Account updated successfully');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error)).status(500);
    console.error(error);
    next(error);
  }
};

exports.deletePlexAccount = (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM plex WHERE id = ${id}`;

    connection.query(sql, (error) => {
      if (error) throw error;
      res.send('Delete Plex Account');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};
