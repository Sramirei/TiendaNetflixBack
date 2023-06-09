const { check } = require('express-validator')
const { validateResult } = require('../Util/ValidateHelper')

const validateCreateDisneyAccount = [
    check('correo').exists().not().isEmpty().isString().isEmail(),
    check('contrasena').exists().not().isEmpty().isString().trim(),
    check('usado').exists().not().isEmpty().isString(),
    (req, res, next) =>{
        try {
            validateResult(req, res, next)
        } catch (error) {
            return console.error(error);
        }
    }
]


module.exports = { validateCreateDisneyAccount }