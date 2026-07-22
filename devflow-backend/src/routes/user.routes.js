const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");

const {
    getProfile,
    getUsers
} = require("../controllers/user.controller");

/**
 * Get Logged-in User
 */
router.get(
    "/profile",
    authenticateUser,
    getProfile
);

/**
 * Get All Users
 */
router.get(
    "/",
    authenticateUser,
    getUsers
);

module.exports = router;