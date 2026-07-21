const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/task.controllers");

const {
    taskValidation,
    validate
} = require("../validations/task.validation");

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: integer
 *               assigned_to:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 example: High
 *               status:
 *                 type: string
 *                 example: Pending
 *               due_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post(
    "/",
    authenticateUser,
    authorize("Admin", "Developer"),
    taskValidation,
    validate,
    createTask
);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get(
    "/",
    authenticateUser,
    getTasks
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags:
 *       - Tasks
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
 *         description: Task retrieved successfully
 */
router.get(
    "/:id",
    authenticateUser,
    getTaskById
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
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
 *               project_id:
 *                 type: integer
 *               assigned_to:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               due_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put(
    "/:id",
    authenticateUser,
    authorize("Admin", "Developer"),
    taskValidation,
    validate,
    updateTask
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
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
 *         description: Task deleted successfully
 */
router.delete(
    "/:id",
    authenticateUser,
    authorize("Admin"),
    deleteTask
);

module.exports = router;