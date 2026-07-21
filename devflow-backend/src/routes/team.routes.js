const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
    createTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
    addMember,
    removeMember,
    getMembers
} = require("../controllers/team.controller");

const {
    teamValidation,
    memberValidation,
    validate
} = require("../validations/team.validation");

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Create a new team
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Team created successfully
 */
router.post(
    "/",
    authenticateUser,
    authorize("Admin"),
    teamValidation,
    validate,
    createTeam
);

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: Get all teams
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teams retrieved successfully
 */
router.get(
    "/",
    authenticateUser,
    getTeams
);

/**
 * @swagger
 * /api/teams/{id}:
 *   get:
 *     summary: Get team by ID
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team retrieved successfully
 */
router.get(
    "/:id",
    authenticateUser,
    getTeamById
);

/**
 * @swagger
 * /api/teams/{id}:
 *   put:
 *     summary: Update a team
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               team_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team updated successfully
 */
router.put(
    "/:id",
    authenticateUser,
    authorize("Admin"),
    teamValidation,
    validate,
    updateTeam
);

/**
 * @swagger
 * /api/teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team deleted successfully
 */
router.delete(
    "/:id",
    authenticateUser,
    authorize("Admin"),
    deleteTeam
);

/**
 * @swagger
 * /api/teams/{id}/members:
 *   post:
 *     summary: Add a member to a team
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Member added successfully
 */
router.post(
    "/:id/members",
    authenticateUser,
    authorize("Admin"),
    memberValidation,
    validate,
    addMember
);

/**
 * @swagger
 * /api/teams/{id}/members/{userId}:
 *   delete:
 *     summary: Remove a member from a team
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member removed successfully
 */
router.delete(
    "/:id/members/:userId",
    authenticateUser,
    authorize("Admin"),
    removeMember
);

/**
 * @swagger
 * /api/teams/{id}/members:
 *   get:
 *     summary: Get all members of a team
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team members retrieved successfully
 */
router.get(
    "/:id/members",
    authenticateUser,
    getMembers
);

module.exports = router;