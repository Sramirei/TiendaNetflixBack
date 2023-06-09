const express = require('express');
const router = express.Router();
const controller = require('../Controller/hboController');
const userExtrator = require('../Util/userExtrator')
/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de HBO:
 *       type: object
 *       properties:
 *         id: 
 *           type: int
 *           example: 1
 *         correo: 
 *           type: string
 *           example: correo@hbo.com  
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
 * /api/hbo:
 *   get:
 *     tags:
 *       - Cuentas de HBO
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
 *                   $ref: '#/components/schemas/Cuentas de HBO'
 */
router.get('/hbo',userExtrator, controller.getAllHBOAccounts);

/**
 * @openapi
 * /api/hbo/{id}:
 *   get:
 *     tags:
 *       - Cuentas de HBO
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de HBO
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
 *                   $ref: '#/components/schemas/Cuentas de HBO'
 */
router.get('/hbo/:id',userExtrator, controller.getOneHBOAccount);

/**
 * @openapi
 * /api/hbo:
 *   post:
 *     tags:
 *       - Cuentas de HBO
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuentas de HBO'
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
 *                   example: HBO Account created successfully
 */
router.post('/hbo',userExtrator, controller.createHBOAccount);

/**
 * @openapi
 * /api/hbo/{id}:
 *   put:
 *     tags:
 *       - Cuentas de HBO
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuentas de HBO'
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
router.put('/hbo/:id',userExtrator, controller.updateHBOAccount);

/**
 * @openapi
 * /api/hbo/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de HBO
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
router.delete('/hbo/:id',userExtrator, controller.deleteHBOAccount);

module.exports = router;
