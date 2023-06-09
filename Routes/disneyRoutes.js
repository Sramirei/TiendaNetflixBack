const express = require("express");
const router = express.Router();
const controller = require("../Controller/disneyController");
const { validateCreateDisneyAccount } = require("../Validator/disney");
const userExtrator = require("../Util/userExtrator");

/**
 * @openapi
 * components:
 *   schemas:
 *     Cuentas de Disney:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 1
 *         correo:
 *           type: string
 *           example: correo@disney.com
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
 * /api/disney:
 *   get:
 *     tags:
 *       - Cuentas de Disney
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
 *                   $ref: '#/components/schemas/Cuentas de Disney'
 */
router.get("/disney", userExtrator, controller.getAllDisneyAccount);
/**
 * @openapi
 * /api/disney/{id}:
 *   get:
 *     tags:
 *       - Cuentas de Disney
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la cuenta de disney
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
 *                   $ref: '#/components/schemas/Cuentas de Disney'
 */
router.get("/disney/:id", userExtrator, controller.getOneDisneyAccount);
/**
 * @openapi
 * /api/disney:
 *   post:
 *     tags:
 *       - Cuentas de Disney
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
 *                   $ref: '#/components/schemas/Cuentas de Disney'
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
 *                   example: Disney Account created successfully
 */
router.post(
  "/disney",
  userExtrator,
  validateCreateDisneyAccount,
  controller.createdDisneyAccount
);
/**
 * @openapi
 * /api/disney/{id}:
 *   put:
 *     tags:
 *       - Cuentas de Disney
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Cuentas de Disney'
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
router.put("/disney/:id", userExtrator, controller.updateDisneyAccount);
/**
 * @openapi
 * /api/disney/{id}:
 *   delete:
 *     tags:
 *       - Cuentas de Disney
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
router.delete("/disney/:id", userExtrator, controller.deleteDisneyAccount);

module.exports = router;
