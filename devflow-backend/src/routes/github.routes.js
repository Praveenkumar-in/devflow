const express = require("express");
const router = express.Router();

const {
    githubLogin,
    githubCallback,
    getGithubProfile,
    getGithubRepositories
} = require("../controllers/github.controller");

/**
 * @swagger
 * /api/github/login:
 *   get:
 *     summary: Redirect user to GitHub OAuth login
 *     tags:
 *       - GitHub
 *     responses:
 *       302:
 *         description: Redirects to GitHub login page
 */
router.get("/login", githubLogin);

/**
 * @swagger
 * /api/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     tags:
 *       - GitHub
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: GitHub authentication successful
 */
router.get("/callback", githubCallback);

/**
 * @swagger
 * /api/github/profile:
 *   get:
 *     summary: Get authenticated GitHub user profile
 *     tags:
 *       - GitHub
 *     responses:
 *       200:
 *         description: GitHub profile retrieved successfully
 */
router.get("/profile", getGithubProfile);

/**
 * @swagger
 * /api/github/repos:
 *   get:
 *     summary: Get authenticated user's GitHub repositories
 *     tags:
 *       - GitHub
 *     responses:
 *       200:
 *         description: GitHub repositories retrieved successfully
 */
router.get("/repos", getGithubRepositories);

module.exports = router;