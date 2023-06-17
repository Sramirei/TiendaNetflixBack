const { connection } = require('../DataBase/db');

exports.getAllAmazonAccount = (req, res, next) => {
  const sql = 'SELECT * FROM amazon ORDER BY id DESC';
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

exports.getOneAmazonAccount = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM amazon WHERE id = ${id} ORDER BY id DESC`;
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

exports.createdAmazonAccount = async (req, res, next) => {
  try {

    const {
      correo,
      contrasena,
      pantalla,
      usado
    } = req.body;

    // Proceed to create the user
    const createAmazonAccountQuery =
      'INSERT INTO amazon (correo, contrasena, pantalla, usado) VALUES (?, ?, ?,?)';
    const createAmazonAccountValues = [
      correo,
      contrasena,
      pantalla,
      usado
    ];

    connection.query(createAmazonAccountQuery, createAmazonAccountValues, (error, results) => {
      if (error) {
        console.error('Error inserting Amazon Account: ', error);
        res.status(500).send('Server error');
        return;
      }
      res.send('Amazon Account created successfully');
    });

  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};

exports.updateAmazonAccount = async (req, res, next) => {
  const { id } = req.params;

  const {
    correo,
    contrasena,
    usado
  } = req.body;

  try {
    const sql = `UPDATE amazon SET correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), usado = IFNULL(?, usado) WHERE id = ?`;
    const values = [
      correo,
      contrasena,
      usado,
      id
    ];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error updating Amazon Account: ', error);
        res.status(500).send('Error en el servidor');
        return;
      }
      res.send('Amazon Account updated successfully');
    });
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
    console.error(error);
    next(error);
  }
};

exports.deleteAmazonAccount = (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM amazon WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
      if (error) throw error;

      if (results.length === 0) {
        res.status(404).send('Amazon Account not found');
      } else {
        const account = results[0];
        if (account.usado !== '0') {
          res.status(405).send('Cannot delete Amazon Account. Account is not unused.');
        } else {
          const deleteSql = `DELETE FROM amazon WHERE id = ${id}`;
          connection.query(deleteSql, deleteError => {
            if (deleteError) throw deleteError;
            res.send('Delete Amazon Account');
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