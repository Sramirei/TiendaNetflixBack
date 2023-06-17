const { connection } = require('../DataBase/db');

exports.getAllSpotifyAccounts = (req, res, next) => {
  const sql = 'SELECT * FROM spotify ORDER BY id DESC';
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

exports.getOneSpotifyAccount = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM spotify WHERE id = ${id} ORDER BY id DESC`;
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

exports.createSpotifyAccount = async (req, res, next) => {
  try {
    const { correo, contrasena, pantalla, usado } = req.body;

    // Proceed to create the account without checking if the email already exists
    const createSpotifyAccountQuery =
      'INSERT INTO spotify (correo, contrasena, pantalla, usado) VALUES (?, ?, ?, ?)';
    const createSpotifyAccountValues = [correo, contrasena, pantalla, usado];

    connection.query(
      createSpotifyAccountQuery,
      createSpotifyAccountValues,
      (error, results) => {
        if (error) {
          console.error('Error inserting Spotify Account: ', error);
          res.status(500).send('Server error');
          return;
        }
        res.send('Spotify Account created successfully');
      }
    );
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};


exports.updateSpotifyAccount = async (req, res, next) => {
  const { id } = req.params;
  const { correo, contrasena, pantalla, usado } = req.body;

  try {
    const sql = `UPDATE spotify SET correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), pantalla = IFNULL(?, pantalla), usado = IFNULL(?, usado) WHERE id = ?`;
    const values = [correo, contrasena, pantalla, usado, id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error updating Spotify Account: ', error);
        res.status(500).send('Server error');
        return;
      }
      res.send('Spotify Account updated successfully');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error)).status(500);
    console.error(error);
    next(error);
  }
};

exports.deleteSpotifyAccount = (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM spotify WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
      if (error) throw error;

      if (results.length === 0) {
        res.status(404).send('spotify Account not found');
      } else {
        const account = results[0];
        if (account.usado !== '0') {
          res.status(405).send('Cannot delete spotify Account. Account is unused.');
        } else {
          const deleteSql = `DELETE FROM spotify WHERE id = ${id}`;
          connection.query(deleteSql, deleteError => {
            if (deleteError) throw deleteError;
            res.send('Delete spotify Account');
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};
