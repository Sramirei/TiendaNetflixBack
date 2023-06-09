const express = require('express');
const router = express.Router();
const controller = require('../Controller/appleController');
const userExtrator = require('../Util/userExtrator')

/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de Apple:
 *       type: object
 *       properties:
 *         id: 
 *           type: int
 *           example: 1
 *         correo: 
 *           type: string
 *           example: correo@apple.com  
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
 * /api/apple:
 *   get:
 *     tags:
 *       - Cuentas de Apple
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
 *                   $ref: '#/components/schemas/Cuentas de Apple'
 */
router.get('/apple', userExtrator, controller.getAllAppleAccount);

/**
 * @openapi
 * /api/apple/{id}:
 *   get:
 *     tags:
 *       - Cuentas de Apple
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de Apple
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
 *                   $ref: '#/components/schemas/Cuentas de Apple'
 */
router.get('/apple/:id', userExtrator, controller.getOneAppleAccount);

/**
 * @openapi
 * /api/apple:
 *   post:
 *     tags:
 *       - Cuentas de Apple
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuentas de Apple'
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
 *                   example: Apple Account created successfully
 */
router.post('/apple', userExtrator, controller.createdAppleAccount);

/**
 * @openapi
 * /api/apple/{id}:
 *   put:
 *     tags:
 *       - Cuentas de Apple
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
 *             $ref: '#/components/schemas/Cuentas de Apple'
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
router.put('/apple/:id', userExtrator, controller.updateAppleAccount);

/**
 * @openapi
 * /api/apple/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de Apple
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
router.delete('/apple/:id', userExtrator, controller.deleteAppleAccount);

module.exports = router;
