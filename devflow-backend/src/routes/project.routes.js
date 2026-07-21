const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require("../controllers/project.controller");

const {
    projectValidation,
    validate
} = require("../validations/project.validation");

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: Planning
 *     responses:
 *       201:
 *         description: Project created successfully
 */
router.post(
    "/",
    authenticateUser,
    authorize("Admin"),
    projectValidation,
    validate,
    createProject
);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get(
    "/",
    authenticateUser,
    getProjects
);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags:
 *       - Projects
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
 *         description: Project retrieved successfully
 */
router.get(
    "/:id",
    authenticateUser,
    getProjectById
);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags:
 *       - Projects
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 */
router.put(
    "/:id",
    authenticateUser,
    authorize("Admin"),
    projectValidation,
    validate,
    updateProject
);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags:
 *       - Projects
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
 *         description: Project deleted successfully
 */
router.delete(
    "/:id",
    authenticateUser,
    authorize("Admin"),
    deleteProject
);

module.exports = router;