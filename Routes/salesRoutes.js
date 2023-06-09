const express = require('express');
const router = express.Router()
const controller = require('../Controller/salesController')
const userExtrator = require('../Util/userExtrator')

/**
 * @openapi
 * components:
 *   schemas:
 *     Ventas:
 *       type: object
 *       properties:
 *         cod_ventas: 
 *           type: int
 *           example: 1
 *         numero_factura: 
 *           type: int
 *           example: 1  
 *         cod_usuario: 
 *           type: string
 *           example: 1
 *         producto:
 *           type: string
 *           example: Netflix
 *         pantalla:
 *           type: string
 *           example: 2
 *         cod_producto:
 *           type: string
 *           example: 3
 *         costo:
 *           type: string
 *           example: NULL
 *         estado:
 *           type: string
 *           example: 1
 *         fecha:
 *           type: string
 *           example: 23-050-2023
 */

/**
 * @openapi
 * /api/sales:
 *   get:
 *     tags:
 *       - Ventas
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
 *                   $ref: '#/components/schemas/Ventas'
 */
router.get('/sales',userExtrator, controller.getAllSales)
/**
 * @openapi
 * /api/sales/{cod_ventas}:
 *   get:
 *     tags:
 *       - Ventas
 *     parameters:
 *       - in: path
 *         name: cod_amazon
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la Venta
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
 *                   $ref: '#/components/schemas/Ventas'
 */
router.get('/sales/:cod_ventas',userExtrator, controller.getOneSale)
/**
 * @openapi
 * /api/sales:
 *   post:
 *     tags:
 *       - Ventas
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
 *                   $ref: '#/components/schemas/Ventas'
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
 *                   example: Sale created successfully
 */
router.post('/sales',userExtrator, controller.createdSale)
/**
 * @openapi
 * /api/sales/{cod_ventas}:
 *   put:
 *     tags:
 *       - Ventas
 *     parameters:
 *       - in: path
 *         name: cod_ventas
 *         required: true
 *         schema:
 *           schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Ventas'
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
router.put('/sales/:cod_ventas',userExtrator, controller.updateSale)
/**
 * @openapi
 * /api/sales/{cod_ventas}:
 *   delete:
 *     tags:
 *       - Ventas
 *     parameters:
 *       - in: path
 *         name: cod_ventas
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
router.delete('/sales/:cod_ventas',userExtrator, controller.deleteSale)


module.exports = router