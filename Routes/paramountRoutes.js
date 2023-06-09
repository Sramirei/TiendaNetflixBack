const express = require('express');
const router = express.Router();
const controller = require('../Controller/paramountController');
const userExtrator = require('../Util/userExtrator')

/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de Paramount:
 *       type: object
 *       properties:
 *         id: 
 *           type: int
 *           example: 1
 *         correo: 
 *           type: string
 *           example: correo@paramount.com  
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
 * /api/paramount:
 *   get:
 *     tags:
 *       - Cuentas de Paramount
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
 *                   $ref: '#/components/schemas/Cuentas de Paramount'
 */
router.get('/paramount',userExtrator, controller.getAllParamountAccounts);

/**
 * @openapi
 * /api/paramount/{id}:
 *   get:
 *     tags:
 *       - Cuentas de Paramount
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de Paramount
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
 *                   $ref: '#/components/schemas/Cuentas de Paramount'
 */
router.get('/paramount/:id',userExtrator, controller.getOneParamountAccount);

/**
 * @openapi
 * /api/paramount:
 *   post:
 *     tags:
 *       - Cuentas de Paramount
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuentas de Paramount'
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
 *                   example: Paramount Account created successfully
 */
router.post('/paramount',userExtrator, controller.createParamountAccount);

/**
 * @openapi
 * /api/paramount/{id}:
 *   put:
 *     tags:
 *       - Cuentas de Paramount
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
 *             $ref: '#/components/schemas/Cuentas de Paramount'
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
router.put('/paramount/:id',userExtrator, controller.updateParamountAccount);

/**
 * @openapi
 * /api/paramount/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de Paramount
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
router.delete('/paramount/:id',userExtrator, controller.deleteParamountAccount);

module.exports = router;
