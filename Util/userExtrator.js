const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const auth = req.get('authorization');
  let token = null;

  if (auth && auth.toLowerCase().startsWith('bearer')) {
    token = auth.substring(7);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT);

    if (!token || !decodedToken.cod_usuario) {
      return res.status(401).json({ error: 'Token missing or invalid' });
    }

    const { cod_usuario } = decodedToken;
    req.userId = cod_usuario;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token missing or invalid' });
  }
};
