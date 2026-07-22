const db = require("../config/db");

// =============================
// Create Team
// =============================
exports.createTeam = (req, res) => {

    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({
            success: false,
            message: "Name and Description are required"
        });
    }

    const created_by = req.user.id;

    const sql = `
        INSERT INTO teams (team_name, description, created_by)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, description, created_by], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Team created successfully",
            teamId: result.insertId
        });

    });

};

// =============================
// Get All Teams
// =============================
exports.getTeams = (req, res) => {

    const sql = `
        SELECT
            t.id,
            t.team_name,
            t.description,
            t.created_at,
            u.full_name AS created_by
        FROM teams t
        JOIN users u
        ON t.created_by = u.id
        ORDER BY t.created_at DESC
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
            teams: results
        });

    });

};

// =============================
// Get Team By ID
// =============================
exports.getTeamById = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            t.id,
            t.team_name,
            t.description,
            t.created_at,
            u.full_name AS created_by
        FROM teams t
        JOIN users u
        ON t.created_by = u.id
        WHERE t.id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        res.json({
            success: true,
            team: result[0]
        });

    });

};

// =============================
// Update Team
// =============================
exports.updateTeam = (req, res) => {

    const { id } = req.params;
    const { name, description } = req.body;

    const sql = `
        UPDATE teams
        SET team_name=?, description=?
        WHERE id=?
    `;

    db.query(sql, [name, description, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        res.json({
            success: true,
            message: "Team updated successfully"
        });

    });

};

// =============================
// Delete Team
// =============================
exports.deleteTeam = (req, res) => {

    const { id } = req.params;

    db.query("DELETE FROM teams WHERE id=?", [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        res.json({
            success: true,
            message: "Team deleted successfully"
        });

    });

};

// =============================
// Add Member
// =============================
exports.addMember = (req, res) => {

    const team_id = req.params.id;
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({
            success: false,
            message: "User ID is required"
        });
    }

    // Check if the member already exists
    db.query(
        "SELECT * FROM team_members WHERE team_id=? AND user_id=?",
        [team_id, user_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "User is already in this team"
                });
            }

            db.query(
                "INSERT INTO team_members (team_id, user_id) VALUES (?, ?)",
                [team_id, user_id],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    res.status(201).json({
                        success: true,
                        message: "Member added successfully"
                    });

                }
            );

        }
    );

};

// =============================
// Remove Member
// =============================
exports.removeMember = (req, res) => {

    const { id, userId } = req.params;

    db.query(
        "DELETE FROM team_members WHERE team_id=? AND user_id=?",
        [id, userId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Member not found"
                });
            }

            res.json({
                success: true,
                message: "Member removed successfully"
            });

        }
    );

};

// =============================
// Get Team Members
// =============================
exports.getMembers = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            tm.joined_at,
            u.id,
            u.full_name,
            u.email
        FROM team_members tm
        JOIN users u
        ON tm.user_id = u.id
        WHERE tm.team_id=?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            count: results.length,
            members: results
        });

    });

};