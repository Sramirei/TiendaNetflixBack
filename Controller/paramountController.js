const { connection } = require('../DataBase/db');

exports.getAllParamountAccounts = (req, res, next) => {
  const sql = 'SELECT * FROM paramount ORDER BY id DESC';
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

exports.getOneParamountAccount = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM paramount WHERE id = ${id} ORDER BY id DESC`;
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

exports.createParamountAccount = async (req, res, next) => {
  try {
    const { correo, contrasena, pantalla, usado } = req.body;

    // Proceed to create the account without checking if the email already exists
    const createParamountAccountQuery =
      'INSERT INTO paramount (correo, contrasena, pantalla, usado) VALUES (?, ?, ?, ?)';
    const createParamountAccountValues = [correo, contrasena, pantalla, usado];

    connection.query(
      createParamountAccountQuery,
      createParamountAccountValues,
      (error, results) => {
        if (error) {
          console.error('Error inserting Paramount Account: ', error);
          res.status(500).send('Server error');
          return;
        }
        res.send('Paramount Account created successfully');
      }
    );
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};

exports.updateParamountAccount = async (req, res, next) => {
  const { id } = req.params;
  const { correo, password, pantalla, usado } = req.body;

  try {
    const sql = `UPDATE paramount SET correo = IFNULL(?, correo), password = IFNULL(?, password), pantalla = IFNULL(?, pantalla), usado = IFNULL(?, usado) WHERE id = ?`;
    const values = [correo, password, pantalla, usado, id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error updating Paramount Account: ', error);
        res.status(500).send('Server error');
        return;
      }
      res.send('Paramount Account updated successfully');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error)).status(500);
    console.error(error);
    next(error);
  }
};

exports.deleteParamountAccount = (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM paramount WHERE id = ${id}`;

    connection.query(sql, (error) => {
      if (error) throw error;
      res.send('Delete Paramount Account');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};
