const express = require("express");
const settingsController = require("../controllers/settings_controller.js");
const settingsRouter = express.Router();
const busboy = require("../middlewares/busboy_middleware");

/**
 * @openapi
 * tags:
 *   name: Settings
 *   description: Settings management
 */


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
 *                     example: { 
 *                       _id: "67838759c886a879a8ffc617", 
 *                       dollar_price: 15000, 
 *                       createdAt: "2025-01-12T09:11:53.993Z", 
 *                       hero: ["http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"] 
 *                     }
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
 * /settings/dollar:
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
 *                 example: 15000
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
 *                   example: { 
 *                     _id: "67838759c886a879a8ffc617", 
 *                     dollar_price: 15000, 
 *                     createdAt: "2025-01-12T09:11:53.993Z", 
 *                     hero: ["http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"] 
 *                   }
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
settingsRouter.put("/dollar", settingsController.update_dollar_price);

/**
 * @openapi
 * /settings/hero:
 *   post:
 *     summary: Add a photo to the hero section
 *     description: Upload a photo to be added to the hero section using a multipart form data request.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: string
 *                 format: binary
 *                 description: The photo file to be uploaded.
 *     responses:
 *       201:
 *         description: Photo added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: added successfully
 *                 data:
 *                   type: object
 *                   example: { 
 *                     _id: "67838759c886a879a8ffc617", 
 *                     dollar_price: 15000, 
 *                     createdAt: "2025-01-12T09:11:53.993Z", 
 *                     hero: ["http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"] 
 *                   }
 *       400:
 *         description: Bad request due to invalid data or an error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid input or server error.
 */
settingsRouter.post("/hero", settingsController.add_hero_photo);

/**
 * @openapi
 * /settings/hero/{index}:
 *   delete:
 *     summary: Remove a photo from the hero section
 *     description: Deletes a specific photo from the hero section by its index and updates the settings.
 *     tags:
 *       - Settings
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the photo to be removed from the hero section.
 *     responses:
 *       204:
 *         description: Photo removed successfully. No content is returned in the response.
 *       404:
 *         description: Photo not found at the specified index.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "photo not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
settingsRouter.delete("/hero/:index", settingsController.remove_hero_photo)

module.exports = settingsRouter;