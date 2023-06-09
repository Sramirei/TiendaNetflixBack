const express = require('express');
const router = express.Router();
const controller = require('../Controller/spotifyController');
const userExtrator = require('../Util/userExtrator')

/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de Spotify:
 *       type: object
 *       properties:
 *         id: 
 *           type: int
 *           example: 1
 *         correo: 
 *           type: string
 *           example: correo@spotify.com  
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
 * /api/spotify:
 *   get:
 *     tags:
 *       - Cuentas de Spotify
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
 *                   $ref: '#/components/schemas/Cuentas de Spotify'
 */
router.get('/spotify',userExtrator, controller.getAllSpotifyAccounts);

/**
 * @openapi
 * /api/spotify/{id}:
 *   get:
 *     tags:
 *       - Cuentas de Spotify
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de Spotify
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
 *                   $ref: '#components/schemas/Cuentas de Spotify'
 */
router.get('/spotify/:id',userExtrator, controller.getOneSpotifyAccount);

/**
 * @openapi
 * /api/spotify:
 *   post:
 *     tags:
 *       - Cuentas de Spotify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Cuentas de Spotify'
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
 *                   example: Spotify Account created successfully
 */
router.post('/spotify',userExtrator, controller.createSpotifyAccount);

/**
 * @openapi
 * /api/spotify/{id}:
 *   put:
 *     tags:
 *       - Cuentas de Spotify
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
 *             $ref: '#components/schemas/Cuentas de Spotify'
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
router.put('/spotify/:id',userExtrator, controller.updateSpotifyAccount);

/**
 * @openapi
 * /api/spotify/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de Spotify
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
router.delete('/spotify/:id',userExtrator, controller.deleteSpotifyAccount);

module.exports = router;
