const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");

const {
    getDashboard
} = require("../controllers/dashboard.controller");

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 totalProjects:
 *                   type: integer
 *                 totalTasks:
 *                   type: integer
 *                 completedTasks:
 *                   type: integer
 *                 pendingTasks:
 *                   type: integer
 *                 totalTeams:
 *                   type: integer
 *                 totalBugs:
 *                   type: integer
 */
router.get(
    "/",
    authenticateUser,
    getDashboard
);

module.exports = router;