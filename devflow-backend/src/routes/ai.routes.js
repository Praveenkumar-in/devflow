const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");

const {
    askAI,
    getAIHistory,
    reviewCode,
    explainBug
} = require("../controllers/ai.controller");

/**
 * @swagger
 * /api/ai/ask:
 *   post:
 *     summary: Ask AI a question
 *     tags:
 *       - AI
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: Explain REST API
 *     responses:
 *       200:
 *         description: AI response generated successfully
 */
router.post("/ask", authenticateUser, askAI);

/**
 * @swagger
 * /api/ai/history:
 *   get:
 *     summary: Get AI chat history
 *     tags:
 *       - AI
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: AI history retrieved successfully
 */
router.get("/history", authenticateUser, getAIHistory);

/**
 * @swagger
 * /api/ai/code-review:
 *   post:
 *     summary: Review source code using AI
 *     tags:
 *       - AI
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: const a = 10;
 *     responses:
 *       200:
 *         description: Code reviewed successfully
 */
router.post("/code-review", authenticateUser, reviewCode);

/**
 * @swagger
 * /api/ai/bug-explanation:
 *   post:
 *     summary: Explain a bug using AI
 *     tags:
 *       - AI
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bug:
 *                 type: string
 *                 example: TypeError: Cannot read properties of undefined
 *     responses:
 *       200:
 *         description: Bug explanation generated successfully
 */
router.post("/bug-explanation", authenticateUser, explainBug);

module.exports = router;