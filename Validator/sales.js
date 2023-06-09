const { check } = require('express-validator')
const { validateResult } = require('../Util/ValidateHelper')

const validateCreateSales = [
    check('numero_factura').exists().not().isEmpty().isNumeric().isInt(),
    check('cod_usuario').exists().not().isEmpty().isString(),
    check('producto').exists().not().isEmpty().isString(),
    check('pantalla').exists().not().isEmpty().isString(),
    check('cod_producto').exists().not().isEmpty().isString(),
    (req, res, next) =>{
        try {
            validateResult(req, res, next)
        } catch (error) {
            return console.error(error);
        }
    }
]


module.exports = { validateCreateSales }