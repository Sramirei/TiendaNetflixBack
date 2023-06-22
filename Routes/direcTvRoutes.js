const express = require('express');
const router = express.Router();
const controller = require('../Controller/direcTvController');
const userExtrator = require('../Util/userExtrator')

/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de DirecTv:
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
 * /api/directv:
 *   get:
 *     tags:
 *       - Cuentas de DirecTv
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
 *                   $ref: '#/components/schemas/Cuentas de DirecTv'
 */
router.get('/directv', userExtrator, controller.getAllDirecTvAccount);

/**
 * @openapi
 * /api/directv/{id}:
 *   get:
 *     tags:
 *       - Cuentas de DirecTv
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de DirecTv
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
 *                   $ref: '#/components/schemas/Cuentas de DirecTv'
 */
router.get('/directv/:id', userExtrator, controller.getOneDirecTvAccount);

/**
 * @openapi
 * /api/directv:
 *   post:
 *     tags:
 *       - Cuentas de DirecTv
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuentas de DirecTv'
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
router.post('/directv', userExtrator, controller.createdDirecTvAccount);

/**
 * @openapi
 * /api/directv/{id}:
 *   put:
 *     tags:
 *       - Cuentas de DirecTv
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
 *             $ref: '#/components/schemas/Cuentas de DirecTv'
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
router.put('/directv/:id', userExtrator, controller.updateDirecTvAccount);

/**
 * @openapi
 * /api/directv/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de DirecTv
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
router.delete('/directv/:id', userExtrator, controller.deleteDirecTvAccount);

module.exports = router;
