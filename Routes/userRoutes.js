const express = require('express');
const router = express.Router()
const controller = require('../Controller/userController')
const { validateCreateUser } = require('../Validator/user')
const userExtrator = require('../Util/userExtrator')

/**
 * @openapi
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         cod_usuario: 
 *           type: int
 *           example: 1
 *         identificacion: 
 *           type: string
 *           example: 6645987  
 *         nombre:
 *           type: string
 *           example: Pedro
 *         apellido:
 *           type: string
 *           example: Castllo
 *         celular:
 *           type: string
 *           example: 3206547689
 *         correo:
 *           type: string
 *           example: correo@gmail.com
 *         empresa: 
 *           type: string
 *           example: Grupo Bancolombia
 *         login:
 *           type: string
 *           example: Tramiteya97
 *         contrasena:
 *           type: string
 *           example: 123456
 *         perfil:
 *           type: string
 *           example: 1
 *         estado:
 *           type: string
 *           example: Activo
 *         cod_precio:
 *           type: string
 *           example: 2
 */

/**
 * @openapi
 * /api/user:
 *   get:
 *     tags:
 *       - Usuario
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
 *                   $ref: '#/components/schemas/Usuario'
 */
router.get('/user',userExtrator, controller.getAllUsers)
/**
 * @openapi
 * /api/user/{cod_usuario}:
 *   get:
 *     tags:
 *       - Usuario
 *     parameters:
 *       - in: path
 *         name: cod_usuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código del usuario
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
 *                   $ref: '#/components/schemas/Usuario'
 */
router.get('/user/:cod_usuario',userExtrator, controller.getOneUser)
/**
 * @openapi
 * /api/verify-token:
 *   get:
 *     tags:
 *       - Autenticación
 *     security:
 *       - bearerAuth: []
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
 *                   $ref: '#/components/schemas/Usuario'
 */
router.get('/verifyToken', controller.verifyToken)
/**
 * @openapi
 * /api/user:
 *   post:
 *     tags:
 *       - Usuario
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
 *                   $ref: '#/components/schemas/Usuario'
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
 *                   example: User created successfully
 */
router.post('/user',userExtrator, validateCreateUser, controller.createdUser)
/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: miUsuario
 *               contrasena:
 *                 type: string
 *                 example: miContraseña
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 identificacion:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 celular:
 *                   type: string
 *                 correo:
 *                   type: string
 *                 empresa:
 *                   type: string
 *                 login:
 *                   type: string
 *                 perfil:
 *                   type: string
 *                 estado:
 *                   type: string
 *                 cod_precio:
 *                   type: integer
 *                 cod_usuario:
 *                   type: integer
 *                 token:
 *                   type: string
 */
router.post('/login', controller.login)
/**
 * @openapi
 * /api/user/{cod_usuario}:
 *   put:
 *     tags:
 *       - Usuario
 *     parameters:
 *       - in: path
 *         name: cod_usuario
 *         required: true
 *         schema:
 *           schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
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
router.put('/user/:cod_usuario',userExtrator, controller.updateUser)

router.put('/users', controller.updateAllUser)
/**
 * @openapi
 * /api/user/{cod_usuario}:
 *   delete:
 *     tags:
 *       - Usuario
 *     parameters:
 *       - in: path
 *         name: cod_usuario
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
router.delete('/user/:cod_usuario',userExtrator, controller.deleteUser)


module.exports = router