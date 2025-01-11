const express = require("express");
const settingsController = require("../controllers/settings_controller.js");
const settingsRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: Settings
 *   description: Settings management
 */

/**
 * @openapi
 * /settings:
 *   post:
 *     summary: Create a new settings entry
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dollar_price:
 *                 type: number
 *                 example: 75.5
 *             required:
 *               - dollar_price
 *     responses:
 *       201:
 *         description: Settings created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: { _id: "6781c461d76f1a35bed2eeb0", dollar_price: 75.5 , createdAt: "2025-01-11T01:07:45.228Z" }
 *                 message:
 *                   type: string
 *                   example: created successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid input
 */
settingsRouter.post('/', settingsController.create);

/**
 * @openapi
 * /settings:
 *   get:
 *     summary: Retrieve the settings
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Settings returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: { _id: "6781c461d76f1a35bed2eeb0", dollar_price: 75.5 , createdAt: "2025-01-11T01:07:45.228Z" }
 *                 message:
 *                   type: string
 *                   example: returned successfully
 *       404:
 *         description: No settings found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: There is no settings yet
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: An error occurred
 */
settingsRouter.get("/", settingsController.get);

/**
 * @openapi
 * /settings:
 *   put:
 *     summary: Update the settings
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dollar_price:
 *                 type: number
 *                 example: 80.0
 *             required:
 *               - dollar_price
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: { _id: "6781c461d76f1a35bed2eeb0", dollar_price: 75.5 , createdAt: "2025-01-11T01:07:45.228Z" }
 *                 message:
 *                   type: string
 *                   example: updated successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid input
 */
settingsRouter.put("/", settingsController.update);

module.exports = settingsRouter;