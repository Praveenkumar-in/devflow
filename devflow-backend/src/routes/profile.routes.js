const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
    profileValidation,
    validate
} = require("../validations/profile.validation");

const {
    getProfile,
    updateProfile,
    uploadProfilePicture,
    changePassword
} = require("../controllers/profile.controller");

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 */
router.get(
    "/",
    authenticateUser,
    getProfile
);

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update logged-in user's profile
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put(
    "/",
    authenticateUser,
    profileValidation,
    validate,
    updateProfile
);

/**
 * @swagger
 * /api/profile/upload-profile:
 *   post:
 *     summary: Upload profile picture
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 */
router.post(
    "/upload-profile",
    authenticateUser,
    upload.single("profile"),
    uploadProfilePicture
);

/**
 * @swagger
 * /api/profile/change-password:
 *   put:
 *     summary: Change user password
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.put(
    "/change-password",
    authenticateUser,
    changePassword
);

module.exports = router;