const db = require("../config/db");

exports.createProject = (req, res) => {

    const { title, description, deadline, status } = req.body;

    const created_by = req.user.id;

    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Project title is required"
        });
    }

    const sql = `
        INSERT INTO projects
        (title, description, deadline, status, created_by)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            title,
            description,
            deadline,
            status || "Planning",
            created_by
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Project created successfully",
                projectId: result.insertId
            });

        }
    );

};
exports.getProjects = (req, res) => {

    const sql = `
        SELECT
            p.*,
            u.full_name AS created_by_name
        FROM projects p
        JOIN users u
        ON p.created_by = u.id
        ORDER BY p.created_at DESC
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
            projects: results
        });

    });

};
exports.getProjectById = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT
            p.*,
            u.full_name AS created_by_name,
            u.email AS created_by_email
        FROM projects p
        JOIN users u
            ON p.created_by = u.id
        WHERE p.id = ?
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
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            project: result[0]
        });
    });
};
exports.updateProject = (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        status,
        deadline
    } = req.body;

    db.query(
        `UPDATE projects
         SET title=?,
             description=?,
             status=?,
             deadline=?
         WHERE id=?`,
        [
            title,
            description,
            status,
            deadline,
            id
        ],
        (err) => {

            if (err)
                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            res.json({
                success: true,
                message: "Project updated successfully"
            });

        }
    );

};
exports.deleteProject = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM projects WHERE id=?",
        [id],
        (err) => {

            if (err)
                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            res.json({
                success: true,
                message: "Project deleted successfully"
            });

        }
    );

};