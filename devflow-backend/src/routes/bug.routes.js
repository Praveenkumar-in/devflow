const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
    bugValidation,
    assignValidation,
    statusValidation,
    validate
} = require("../validations/bug.validation");

const {
    createBug,
    getBugs,
    getBugById,
    updateBug,
    deleteBug,
    assignBug,
    updateBugStatus
} = require("../controllers/bug.controller");

/**
 * @swagger
 * /api/bugs:
 *   post:
 *     summary: Create a new bug
 *     tags:
 *       - Bugs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *                 example: Open
 *               screenshot:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Bug created successfully
 */
router.post(
    "/",
    authenticateUser,
    upload.single("screenshot"),
    bugValidation,
    validate,
    createBug
);

/**
 * @swagger
 * /api/bugs:
 *   get:
 *     summary: Get all bugs
 *     tags:
 *       - Bugs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bugs
 */
router.get(
    "/",
    authenticateUser,
    getBugs
);

/**
 * @swagger
 * /api/bugs/{id}:
 *   get:
 *     summary: Get bug by ID
 *     tags:
 *       - Bugs
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
 *         description: Bug retrieved successfully
 */
router.get(
    "/:id",
    authenticateUser,
    getBugById
);

/**
 * @swagger
 * /api/bugs/{id}:
 *   put:
 *     summary: Update a bug
 *     tags:
 *       - Bugs
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
 *         multipart/form-data:
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
 *               screenshot:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Bug updated successfully
 */
router.put(
    "/:id",
    authenticateUser,
    upload.single("screenshot"),
    bugValidation,
    validate,
    updateBug
);

/**
 * @swagger
 * /api/bugs/{id}:
 *   delete:
 *     summary: Delete a bug
 *     tags:
 *       - Bugs
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
 *         description: Bug deleted successfully
 */
router.delete(
    "/:id",
    authenticateUser,
    deleteBug
);

/**
 * @swagger
 * /api/bugs/{id}/assign:
 *   put:
 *     summary: Assign a bug to a developer
 *     tags:
 *       - Bugs
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
 *               assigned_to:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Bug assigned successfully
 */
router.put(
    "/:id/assign",
    authenticateUser,
    assignValidation,
    validate,
    assignBug
);

/**
 * @swagger
 * /api/bugs/{id}/status:
 *   put:
 *     summary: Update bug status
 *     tags:
 *       - Bugs
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
 *               status:
 *                 type: string
 *                 example: Resolved
 *     responses:
 *       200:
 *         description: Bug status updated successfully
 */
router.put(
    "/:id/status",
    authenticateUser,
    statusValidation,
    validate,
    updateBugStatus
);

module.exports = router;