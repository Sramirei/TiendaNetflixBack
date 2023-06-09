const { connection } = require('../DataBase/db');

exports.getAllYoutubeAccounts = (req, res, next) => {
  const sql = 'SELECT * FROM youtube cod_usuario ORDER BY id DESC';
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

exports.getOneYoutubeAccount = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM youtube WHERE id = ${id} cod_usuario ORDER BY id DESC`;
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

exports.createYoutubeAccount = async (req, res, next) => {
  try {
    const { correo, contrasena, pantalla, usado } = req.body;

    // Proceed to create the account
    const createYoutubeAccountQuery =
      'INSERT INTO youtube (correo, contrasena, pantalla, usado) VALUES (?, ?, ?, ?)';
    const createYoutubeAccountValues = [correo, contrasena, pantalla, usado];

    connection.query(
      createYoutubeAccountQuery,
      createYoutubeAccountValues,
      (error, results) => {
        if (error) {
          console.error('Error inserting Youtube Account: ', error);
          res.status(500).send('Server error');
          return;
        }
        res.send('Youtube Account created successfully');
      }
    );
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};

exports.updateYoutubeAccount = async (req, res, next) => {
  const { id } = req.params;
  const { correo, contrasena, pantalla, usado } = req.body;

  try {
    const sql = `UPDATE youtube SET correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), pantalla = IFNULL(?, pantalla), usado = IFNULL(?, usado) WHERE id = ?`;
    const values = [correo, contrasena, pantalla, usado, id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error updating Youtube Account: ', error);
        res.status(500).send('Server error');
        return;
      }
      res.send('Youtube Account updated successfully');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error)).status(500);
    console.error(error);
    next(error);
  }
};

exports.deleteYoutubeAccount = (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM youtube WHERE id = ${id}`;

    connection.query(sql, (error) => {
      if (error) throw error;
      res.send('Delete Youtube Account');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};
