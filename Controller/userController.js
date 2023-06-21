const { connection } = require('../DataBase/db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.getAllUsers = (req, res, next) =>{
    const sql = 'SELECT * FROM usuario ORDER BY cod_usuario DESC'
    connection.query(sql, (error, results) => {
      if (error) throw error
      if (results.length > 0) {
        res.json(results)
      } else {
        res.status(404).send('No users found.')
        next()
      }
    });
}

exports.getOneUser = (req, res, next) => {
    const { cod_usuario } = req.params;
  const sql = `SELECT * FROM usuario WHERE cod_usuario = ${cod_usuario} ORDER BY cod_usuario DESC`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).send('No users found.')
      next()
    }
  });
}

exports.createdUser = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.contrasena, saltRounds);

    const {
      identificacion,
      nombre,
      apellido,
      celular,
      correo,
      empresa,
      login,
      perfil,
      estado,
      cod_precio
    } = req.body;

    // Consulta para verificar si el correo ya existe
    const checkEmailQuery = 'SELECT login FROM usuario WHERE login = ?';
    const checkEmailValues = [login];

    connection.query(checkEmailQuery, checkEmailValues, (error, results) => {
      if (error) {
        console.error('Error checking login: ', error);
        res.status(500).send('Server error');
        return;
      }

      if (results.length > 0) {
        // If the mail already exists, it returns an error indicating that the user cannot be created
        res.status(400).send('The Username is already registered');
        return;
      }

      // If the email does not exist, proceed to create the user
      const createUserQuery =
        'INSERT INTO usuario (identificacion, nombre, apellido, celular, correo, empresa, login, contrasena, perfil, estado, cod_precio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const createUserValues = [
        identificacion,
        nombre,
        apellido,
        celular,
        correo,
        empresa,
        login,
        passwordHash,
        perfil,
        estado,
        cod_precio
      ];

      connection.query(createUserQuery, createUserValues, (error, results) => {
        if (error) {
          console.error('Error inserting user: ', error);
          res.status(500).send('Server error');
          return;
        }
        res.send('User created successfully');
      });
    });
  } catch (error) {
    console.log(error);
    next(error);
    return res.send('Error: ' + JSON.stringify(error));
  }
};

exports.updateUser = async (req, res, next) => {
  const { cod_usuario } = req.params;

  const {
    identificacion,
    nombre,
    apellido,
    celular,
    correo,
    empresa,
    login,
    contrasena,
    perfil,
    estado,
    cod_precio
  } = req.body;

  try {
    let passwordHash = null;

    if (contrasena !== undefined && contrasena !== '') {
      // Si se proporciona una nueva contraseña no vacía, generar el hash
      const saltRounds = 10;
      passwordHash = await bcrypt.hash(contrasena, saltRounds);
    }

    const sql = `UPDATE usuario SET identificacion = IFNULL(?, identificacion), nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), celular = IFNULL(?, celular), correo = IFNULL(?, correo), empresa = IFNULL(?, empresa), login = IFNULL(?, login), contrasena = IF(? IS NULL OR ? = '', contrasena, ?), perfil = IFNULL(?, perfil), estado = ?, cod_precio = IFNULL(?, cod_precio) WHERE cod_usuario = ?`;
    const values = [
      identificacion,
      nombre,
      apellido,
      celular,
      correo,
      empresa,
      login,
      contrasena,
      contrasena,
      passwordHash,
      perfil,
      estado,
      cod_precio,
      cod_usuario
    ];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error al actualizar el usuario: ', error);
        res.status(500).send('Error en el servidor');
        return;
      }
      res.send('Usuario actualizado correctamente');
    });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error)).status(500);
    console.error(error);
    next(error);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const { cod_usuario } = req.params;
  const sql = `DELETE FROM usuario WHERE cod_usuario = ${cod_usuario}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Delete User');
  });
  } catch (error) {
    res.send('Error: ' + JSON.stringify(error));
    console.error(error)
    next(error);
  }
}

exports.login = async (req, res, next) => {

  const { login, contrasena } = req.body;

  console.log(login + ' ' + contrasena);

  const sql = 'SELECT * FROM usuario WHERE login = ?';
  connection.query(sql, [login], async (error, results) => {
    if (error) {
      return res.status(500).json({
        error: 'Internal server error'
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        error: 'Invalid user or password'
      });
    }

    const user = results[0];
    const passwordCorrect = await bcrypt.compare(contrasena, user.contrasena);

    if (!passwordCorrect) {
      return res.status(401).json({
        error: 'Invalid user or password'
      });
    }

    const userForToken = {
      identificacion: user.identificacion,
      nombre: user.nombre,
      apellido: user.apellido,
      celular: user.celular,
      correo: user.correo,
      empresa: user.empresa,
      login: user.login,
      perfil: user.perfil,
      estado: user.estado,
      cod_precio: user.cod_precio,
      cod_usuario: user.cod_usuario
    };

    const token = jwt.sign(userForToken, process.env.SECRET_JWT, {
      expiresIn: 60 * 60 * 4
    });

    res.status(200).json({
      identificacion: user.identificacion,
      nombre: user.nombre,
      apellido: user.apellido,
      celular: user.celular,
      correo: user.correo,
      empresa: user.empresa,
      login: user.login,
      perfil: user.perfil,
      estado: user.estado,
      cod_precio: user.cod_precio,
      cod_usuario: user.cod_usuario,
      token
    });
  });
}

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  
    jwt.verify(token, process.env.SECRET_JWT, { ignoreExpiration: false }, (err, decodedToken) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          // expired token
          return res.status(401).json({ Valid: false, message: 'expired token' });
        } else {
          // Invalid Token
          return res.status(401).json({ Valid: false, message: 'Invalid Token' });
        }
      } else {
        // valid token
        return res.status(200).json({ Valid: true, message: 'valid token' });
      }
    });
}

