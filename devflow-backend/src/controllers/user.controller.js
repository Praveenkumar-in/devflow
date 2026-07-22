const db = require("../config/db");

// Get logged-in user profile
exports.getProfile = (req, res) => {
    res.json({
        success: true,
        message: "Protected Route",
        user: req.user
    });
};

// Get all users
exports.getUsers = (req, res) => {

    const sql = `
        SELECT
            id,
            full_name,
            email,
            role
        FROM users
        ORDER BY full_name ASC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            count: results.length,
            users: results
        });

    });

};