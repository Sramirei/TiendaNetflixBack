const { connection } = require('../DataBase/db');

exports.getAllAppleAccount = (req, res, next) => {
  const sql = 'SELECT * FROM apple ORDER BY id DESC';
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

exports.getOneAppleAccount = (req, res, next) => {
  const { id } = req.params;
  const sql = `SELECT * FROM apple WHERE id = ${id} ORDER BY id DESC`;
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

exports.createdAppleAccount = async (req, res, next) => {
  try {
    const {
      correo,
      contrasena,
      pantalla,
      usado
    } = req.body;

    // Proceder a crear el usuario
    const createAppleAccountQuery =
      'INSERT INTO apple (correo, contrasena, pantalla, usado) VALUES (?, ?, ?, ?)';
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

exports.updateAppleAccount = async (req, res, next) => {
  const { id } = req.params;

  const {
    correo,
    contrasena,
    usado
  } = req.body;

  try {
    const sql = `UPDATE apple SET correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), usado = IFNULL(?, usado) WHERE id = ?`;
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

exports.deleteAppleAccount = (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM apple WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
      if (error) throw error;

      if (results.length === 0) {
        res.status(404).send('apple Account not found');
      } else {
        const account = results[0];
        if (account.usado !== '0') {
          res.status(405).send('Cannot delete apple Account. Account is unused.');
        } else {
          const deleteSql = `DELETE FROM apple WHERE id = ${id}`;
          connection.query(deleteSql, deleteError => {
            if (deleteError) throw deleteError;
            res.send('Delete apple Account');
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