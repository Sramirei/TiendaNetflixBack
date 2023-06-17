const { connection } = require('../DataBase/db');

exports.getAllStartPlusAccounts = (req, res, next) => {
  const sql = 'SELECT * FROM startplus ORDER BY id DESC';
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

exports.getOneStartPlusAccount = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM startplus WHERE id = ${id} ORDER BY id DESC`;
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

exports.createStartPlusAccount = async (req, res, next) => {
  try {
    const { correo, contrasena, pantalla, usado } = req.body;

    // Proceed to create the account without checking if the email already exists
    const createStartPlusAccountQuery =
      'INSERT INTO startplus (correo, contrasena, pantalla, usado) VALUES (?, ?, ?, ?)';
    const createStartPlusAccountValues = [correo, contrasena, pantalla, usado];

    connection.query(
      createStartPlusAccountQuery,
      createStartPlusAccountValues,
      (error, results) => {
        if (error) {
          console.error('Error inserting StartPlus Account: ', error);
          res.status(500).send('Server error');
          return;
        }
        res.send('StartPlus Account created successfully');
      }
    );
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};

exports.updateStartPlusAccount = async (req, res, next) => {
  const { id } = req.params;
  const { correo, contrasena, pantalla, usado } = req.body;

  try {
    const sql = `UPDATE startplus SET correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), pantalla = IFNULL(?, pantalla), usado = IFNULL(?, usado) WHERE id = ?`;
    const values = [correo, contrasena, pantalla, usado, id];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error updating StartPlus Account: ', error);
        res.status(500).send('Server error');
        return;
      }
      res.send('StartPlus Account updated successfully');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error)).status(500);
    console.error(error);
    next(error);
  }
};

exports.deleteStartPlusAccount = (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM startplus WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
      if (error) throw error;

      if (results.length === 0) {
        res.status(404).send('startplus Account not found');
      } else {
        const account = results[0];
        if (account.usado !== '0') {
          res.status(405).send('Cannot delete startplus Account. Account is unused.');
        } else {
          const deleteSql = `DELETE FROM startplus WHERE id = ${id}`;
          connection.query(deleteSql, deleteError => {
            if (deleteError) throw deleteError;
            res.send('Delete startplus Account');
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
