const { check } = require('express-validator')
const { validateResult } = require('../Util/ValidateHelper')

const validateCreateUser = [
    check('identificacion').exists().not().isEmpty().isString(),
    check('nombre').exists().not().isEmpty().isString(),
    check('apellido').exists().not().isEmpty().isString(),
    check('celular').exists().not().isEmpty().isString(),
    check('correo').exists().not().isEmpty().isString().isEmail(),
    check('empresa').exists().not().isEmpty().isString(),
    check('login').exists().not().isEmpty().isString(),
    check('contrasena').exists().not().isEmpty().isString().trim(),
    check('perfil').exists().not().isEmpty().isString(),
    check('estado').exists().not().isEmpty().isString(),
    check('cod_precio').exists().not().isEmpty().isString(),
    (req, res, next) =>{
        try {
            validateResult(req, res, next)
        } catch (error) {
            return console.error(error);
        }
    }
]


module.exports = { validateCreateUser }