const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
    uploadAttachment,
    getAttachments
} = require("../controllers/projectAttachment.controller");

/**
 * @swagger
 * /api/projects/{id}/attachment:
 *   post:
 *     summary: Upload a project attachment
 *     tags:
 *       - Project Attachments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Attachment uploaded successfully
 */
router.post(
    "/:id/attachment",
    authenticateUser,
    upload.single("file"),
    uploadAttachment
);

/**
 * @swagger
 * /api/projects/{id}/attachment:
 *   get:
 *     summary: Get all attachments for a project
 *     tags:
 *       - Project Attachments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project attachments retrieved successfully
 */
router.get(
    "/:id/attachment",
    authenticateUser,
    getAttachments
);

module.exports = router;