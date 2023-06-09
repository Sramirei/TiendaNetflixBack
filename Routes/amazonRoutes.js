const express = require('express');
const router = express.Router()
const controller = require('../Controller/amazonController')
const { validateCreateAmazonAccount } = require('../Validator/amazon')
const userExtrator = require('../Util/userExtrator')
/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de Amazon:
 *       type: object
 *       properties:
 *         id: 
 *           type: int
 *           example: 1
 *         correo: 
 *           type: string
 *           example: correo@amaazon.com  
 *         contrasena:
 *           type: string
 *           example: xytrjm#
 *         pantalla:
 *           type: string
 *           example: 3
 *         usado:
 *           type: string
 *           example: 3
 */

/**
 * @openapi
 * /api/amazon:
 *   get:
 *     tags:
 *       - Cuentas de Amazon
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Cuentas de Amazon'
 */
router.get('/amazon', userExtrator, controller.getAllAmazonAccount)
/**
 * @openapi
 * /api/amazon/{id}:
 *   get:
 *     tags:
 *       - Cuentas de Amazon
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de amazon
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Cuentas de Amazon'
 */
router.get('/amazon/:id', userExtrator, controller.getOneAmazonAccount)
/**
 * @openapi
 * /api/amazon:
 *   post:
 *     tags:
 *       - Cuentas de Amazon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Cuentas de Amazon'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Amazon Account created successfully
 */
router.post('/amazon', userExtrator, validateCreateAmazonAccount, controller.createdAmazonAccount)
/**
 * @openapi
 * /api/amazon/{id}:
 *   put:
 *     tags:
 *       - Cuentas de Amazon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Cuentas de Amazon'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/amazon/:id', userExtrator, controller.updateAmazonAccount)
/**
 * @openapi
 * /api/amazon/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de Amazon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/amazon/:id', userExtrator, controller.deleteAmazonAccount)


module.exports = router