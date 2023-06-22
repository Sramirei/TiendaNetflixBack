const { connection } = require('../DataBase/db');

exports.getAllDirecTvAccount = (req, res, next) => {
  const sql = 'SELECT * FROM directv ORDER BY id DESC';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Server error');
      return;
    }

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send('No account found.');
    }
  });
};

exports.getOneDirecTvAccount = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM directv WHERE id = ${id} ORDER BY id DESC`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Server error');
      return;
    }

    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).send('No account found.');
    }
  });
};

exports.createdDirecTvAccount = async (req, res, next) => {
  try {
    const {
      correo,
      contrasena,
      pantalla,
      usado
    } = req.body;

    // Proceder a crear el usuario
    const createAppleAccountQuery =
      'INSERT INTO directv (correo, contrasena, pantalla, usado) VALUES (?, ?, ?, ?)';
    const createAppleAccountValues = [
      correo,
      contrasena,
      pantalla,
      usado
    ];

    connection.query(createAppleAccountQuery, createAppleAccountValues, (error, results) => {
      if (error) {
        console.error('Error inserting Apple Account: ', error);
        res.status(500).send('Error del servidor');
        return;
      }
      res.send('Apple Account created successfully');
    });

  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};

exports.updateDirecTvAccount = async (req, res, next) => {
  const { id } = req.params;

  const {
    correo,
    contrasena,
    usado
  } = req.body;

  try {
    const sql = `UPDATE directv SET correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), usado = IFNULL(?, usado) WHERE id = ?`;
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

exports.deleteDirecTvAccount = (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM directv WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
      if (error) throw error;

      if (results.length === 0) {
        res.status(404).send('directv Account not found');
      } else {
        const account = results[0];
        if (account.usado !== '0') {
          res.status(405).send('Cannot delete directv Account. Account is unused.');
        } else {
          const deleteSql = `DELETE FROM directv WHERE id = ${id}`;
          connection.query(deleteSql, deleteError => {
            if (deleteError) throw deleteError;
            res.send('Delete directv Account');
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