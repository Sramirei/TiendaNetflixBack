const { connection } = require('../DataBase/db');

exports.getAllDisneyAccount = (req, res, next) => {
  const sql = 'SELECT * FROM disney ORDER BY id DESC';
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

exports.getOneDisneyAccount = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM disney WHERE id = ${id} ORDER BY id DESC`;
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

exports.createdDisneyAccount = async (req, res, next) => {
  try {
    const {
      correo,
      contrasena,
      pantalla,
      usado
    } = req.body;

    // Proceed to create the account without checking if the email already exists
    const createDisneyAccountQuery =
      'INSERT INTO disney (correo, contrasena, pantalla, usado) VALUES (?, ?, ?, ?)';
    const createDisneyAccountValues = [
      correo,
      contrasena,
      pantalla,
      usado
    ];

    connection.query(createDisneyAccountQuery, createDisneyAccountValues, (error, results) => {
      if (error) {
        console.error('Error inserting Disney Account: ', error);
        res.status(500).send('Server error');
        return;
      }
      res.send('Disney Account created successfully');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};


exports.updateDisneyAccount = async (req, res, next) => {
  const { id } = req.params;

  const {
    correo,
    contrasena,
    pantalla,
    usado
  } = req.body;

  try {

    const sql = `UPDATE disney SET correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), pantalla = IFNULL(?, pantalla), usado = IFNULL(?, usado)  WHERE id = ?`;
    const values = [
    correo,
    contrasena,
    pantalla,
    usado,
    id
    ];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error updating Disney Account: ', error);
        res.status(500).send('Error en el server');
        return;
      }
      res.send('Disney Account updated successfully');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error)).status(500);
    console.error(error);
    next(error);
  }
};

exports.deleteDisneyAccount = (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM disney WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
      if (error) throw error;

      if (results.length === 0) {
        res.status(404).send('disney Account not found');
      } else {
        const account = results[0];
        if (account.usado !== '0') {
          res.status(405).send('Cannot delete disney Account. Account is unused.');
        } else {
          const deleteSql = `DELETE FROM disney WHERE id = ${id}`;
          connection.query(deleteSql, deleteError => {
            if (deleteError) throw deleteError;
            res.send('Delete disney Account');
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
}