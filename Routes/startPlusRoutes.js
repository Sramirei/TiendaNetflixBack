const express = require('express');
const router = express.Router();
const controller = require('../Controller/startPlusController');
const userExtrator = require('../Util/userExtrator')

/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de StartPlus:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         correo:
 *           type: string
 *           example: correo@startplus.com
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
 * /api/startplus:
 *   get:
 *     tags:
 *       - Cuentas de StartPlus
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
 *                   $ref: '#/components/schemas/Cuentas de StartPlus'
 */
router.get('/startplus',userExtrator, controller.getAllStartPlusAccounts);

/**
 * @openapi
 * /api/startplus/{id}:
 *   get:
 *     tags:
 *       - Cuentas de StartPlus
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de StartPlus
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
 *                   $ref: '#/components/schemas/Cuentas de StartPlus'
 */
router.get('/startplus/:id',userExtrator, controller.getOneStartPlusAccount);

/**
 * @openapi
 * /api/startplus:
 *   post:
 *     tags:
 *       - Cuentas de StartPlus
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuentas de StartPlus'
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
 *                   example: StartPlus Account created successfully
 */
router.post('/startplus',userExtrator, controller.createStartPlusAccount);

/**
 * @openapi
 * /api/startplus/{id}:
 *   put:
 *     tags:
 *       - Cuentas de StartPlus
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
 *             $ref: '#/components/schemas/Cuentas de StartPlus'
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
router.put('/startplus/:id',userExtrator, controller.updateStartPlusAccount);

/**
 * @openapi
 * /api/startplus/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de StartPlus
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
router.delete('/startplus/:id',userExtrator, controller.deleteStartPlusAccount);

module.exports = router;
