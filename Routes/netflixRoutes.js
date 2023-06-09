const express = require('express');
const router = express.Router()
const controller = require('../Controller/netflixController')
const { validateCreateNetflixAccount } = require('../Validator/netflix')
const userExtrator = require('../Util/userExtrator')

/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de Netflix:
 *       type: object
 *       properties:
 *         id: 
 *           type: int
 *           example: 1
 *         correo: 
 *           type: string
 *           example: correo@disney.com  
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
 * /api/netflix:
 *   get:
 *     tags:
 *       - Cuentas de Netflix
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
 *                   $ref: '#/components/schemas/Cuentas de Netflix'
 */
router.get('/netflix',userExtrator, controller.getAllNetflixAccount)
/**
 * @openapi
 * /api/netflix/{id}:
 *   get:
 *     tags:
 *       - Cuentas de Netflix
 *     parameters:
 *       - in: path
 *         name: cod_disney
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de Netflix
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
 *                   $ref: '#/components/schemas/Cuentas de Netflix'
 */
router.get('/netflix/:id',userExtrator, controller.getOneNetflixAccount)
/**
 * @openapi
 * /api/netflix:
 *   post:
 *     tags:
 *       - Cuentas de Netflix
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
 *                   $ref: '#/components/schemas/Cuentas de Netflix'
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
 *                   example: Netflix Account created successfully
 */
router.post('/netflix',userExtrator, validateCreateNetflixAccount, controller.createdNetflixAccount)
/**
 * @openapi
 * /api/netflix/{id}:
 *   put:
 *     tags:
 *       - Cuentas de Netflix
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
 *                   $ref: '#/components/schemas/Cuentas de Netflix'
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
router.put('/netflix/:id',userExtrator, controller.updateNetflixAccount)
/**
 * @openapi
 * /api/netflix/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de Netflix
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
router.delete('/netflix/:id',userExtrator, controller.deleteNetflixAccount)

module.exports = router