const express = require('express');
const router = express.Router();
const controller = require('../Controller/crunchyrollController');
const userExtrator = require('../Util/userExtrator')

/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de Crunchyroll:
 *       type: object
 *       properties:
 *         id: 
 *           type: int
 *           example: 1
 *         correo: 
 *           type: string
 *           example: correo@crunchyroll.com  
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
 * /api/crunchyroll:
 *   get:
 *     tags:
 *       - Cuentas de Crunchyroll
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
 *                   $ref: '#/components/schemas/Cuentas de Crunchyroll'
 */
router.get('/crunchyroll',userExtrator, controller.getAllCrunchyrollAccounts);

/**
 * @openapi
 * /api/crunchyroll/{id}:
 *   get:
 *     tags:
 *       - Cuentas de Crunchyroll
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de Crunchyroll
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
 *                   $ref: '#/components/schemas/Cuentas de Crunchyroll'
 */
router.get('/crunchyroll/:id', userExtrator, controller.getOneCrunchyrollAccount);

/**
 * @openapi
 * /api/crunchyroll:
 *   post:
 *     tags:
 *       - Cuentas de Crunchyroll
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuentas de Crunchyroll'
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
 *                   example: Crunchyroll Account created successfully
 */
router.post('/crunchyroll',userExtrator, controller.createCrunchyrollAccount);

/**
 * @openapi
 * /api/crunchyroll/{id}:
 *   put:
 *     tags:
 *       - Cuentas de Crunchyroll
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
 *             $ref: '#/components/schemas/Cuentas de Crunchyroll'
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
router.put('/crunchyroll/:id',userExtrator, controller.updateCrunchyrollAccount);

/**
 * @openapi
 * /api/crunchyroll/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de Crunchyroll
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
router.delete('/crunchyroll/:id',userExtrator, controller.deleteCrunchyrollAccount);

module.exports = router;
