const express = require("express");

const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");

/**
 * @swagger
 * /api/protected/profile:
 *   get:
 *     summary: Access a protected profile route
 *     description: Returns the authenticated user's information from the JWT token.
 *     tags:
 *       - Protected
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Protected route accessed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Protected Route
 *                 user:
 *                   type: object
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authenticateUser, (req, res) => {

    res.json({
        success: true,
        message: "Protected Route",
        user: req.user
    });

});

module.exports = router;