const express = require('express');
const router = express.Router();
const controller = require('../Controller/youtubeController');
const userExtrator = require('../Util/userExtrator')
/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de Youtube:
 *       type: object
 *       properties:
 *         id: 
 *           type: int
 *           example: 1
 *         correo: 
 *           type: string
 *           example: correo@youtube.com  
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
 * /api/youtube:
 *   get:
 *     tags:
 *       - Cuentas de Youtube
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
 *                   $ref: '#/components/schemas/Cuentas de Youtube'
 */
router.get('/youtube',userExtrator, controller.getAllYoutubeAccounts);

/**
 * @openapi
 * /api/youtube/{id}:
 *   get:
 *     tags:
 *       - Cuentas de Youtube
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de Youtube
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
 *                   $ref: '#/components/schemas/Cuentas de Youtube'
 */
router.get('/youtube/:id',userExtrator, controller.getOneYoutubeAccount);

/**
 * @openapi
 * /api/youtube:
 *   post:
 *     tags:
 *       - Cuentas de Youtube
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuentas de Youtube'
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
 *                   example: Youtube Account created successfully
 */
router.post('/youtube',userExtrator, controller.createYoutubeAccount);

/**
 * @openapi
 * /api/youtube/{id}:
 *   put:
 *     tags:
 *       - Cuentas de Youtube
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
 *             $ref: '#/components/schemas/Cuentas de Youtube'
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
router.put('/youtube/:id',userExtrator, controller.updateYoutubeAccount);

/**
 * @openapi
 * /api/youtube/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de Youtube
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
router.delete('/youtube/:id',userExtrator, controller.deleteYoutubeAccount);

module.exports = router;
