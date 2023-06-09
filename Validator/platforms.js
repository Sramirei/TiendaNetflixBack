const { check } = require('express-validator')
const { validateResult } = require('../Util/ValidateHelper')

const validatePlatform = [
    check('name').exists().not().isEmpty().isString(),
    check('info').not().isEmpty().isString(),
    check('image').custom((value, { req }) => {
        if (!req.file) {
          throw new Error('You must provide a picture');
        }
        return true;
      }),
    (req, res, next) =>{
        try {
            validateResult(req, res, next)
        } catch (error) {
            return console.error(error);
        }
    }
]


module.exports = { validatePlatform }