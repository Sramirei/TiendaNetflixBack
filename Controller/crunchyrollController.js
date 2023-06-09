const { connection } = require('../DataBase/db');

exports.getAllCrunchyrollAccounts = (req, res, next) => {
  const sql = 'SELECT * FROM crunchyroll ORDER BY id DESC';
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

exports.getOneCrunchyrollAccount = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM crunchyroll WHERE id = ${id} ORDER BY id DESC`;
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

exports.createCrunchyrollAccount = async (req, res, next) => {
  try {
    const { correo, contrasena, pantalla, usado } = req.body;

    // Proceed to create the account without checking if the email already exists
    const createCrunchyrollAccountQuery =
      'INSERT INTO crunchyroll (correo, contrasena, pantalla, usado) VALUES (?, ?, ?, ?)';
    const createCrunchyrollAccountValues = [correo, contrasena, pantalla, usado];

    connection.query(
      createCrunchyrollAccountQuery,
      createCrunchyrollAccountValues,
      (error, results) => {
        if (error) {
          console.error('Error inserting Crunchyroll Account: ', error);
          res.status(500).send('Server error');
          return;
        }
        res.send('Crunchyroll Account created successfully');
      }
    );
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};

exports.updateCrunchyrollAccount = async (req, res, next) => {
  const { id } = req.params;
  const { correo, contrasena, pantalla, usado } = req.body;

  try {
    const sql = `UPDATE crunchyroll SET correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), pantalla = IFNULL(?, pantalla), usado = IFNULL(?, usado) WHERE id = ?`;
    const values = [correo, contrasena, pantalla, usado, id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error updating Crunchyroll Account: ', error);
        res.status(500).send('Server error');
        return;
      }
      res.send('Crunchyroll Account updated successfully');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error)).status(500);
    console.error(error);
    next(error);
  }
};

exports.deleteCrunchyrollAccount = (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM crunchyroll WHERE id = ${id}`;

    connection.query(sql, (error) => {
      if (error) throw error;
      res.send('Delete Crunchyroll Account');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};
