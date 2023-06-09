const express = require('express');
const router = express.Router();
const controller = require('../Controller/plexController');
const userExtrator = require('../Util/userExtrator')

/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de Plex:
 *       type: object
 *       properties:
 *         id: 
 *           type: int
 *           example: 1
 *         correo: 
 *           type: string
 *           example: correo@plex.com  
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
 * /api/plex:
 *   get:
 *     tags:
 *       - Cuentas de Plex
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
 *                   $ref: '#/components/schemas/Cuentas de Plex'
 */
router.get('/plex',userExtrator, controller.getAllPlexAccounts);

/**
 * @openapi
 * /api/plex/{id}:
 *   get:
 *     tags:
 *       - Cuentas de Plex
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de Plex
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
 *                   $ref: '#/components/schemas/Cuentas de Plex'
 */
router.get('/plex/:id',userExtrator, controller.getOnePlexAccount);

/**
 * @openapi
 * /api/plex:
 *   post:
 *     tags:
 *       - Cuentas de Plex
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cuentas de Plex'
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
 *                   example: Plex Account created successfully
 */
router.post('/plex',userExtrator, controller.createPlexAccount);

/**
 * @openapi
 * /api/plex/{id}:
 *   put:
 *     tags:
 *       - Cuentas de Plex
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
 *             $ref: '#/components/schemas/Cuentas de Plex'
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
router.put('/plex/:id',userExtrator, controller.updatePlexAccount);

/**
 * @openapi
 * /api/plex/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de Plex
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
router.delete('/plex/:id',userExtrator, controller.deletePlexAccount);

module.exports = router;
