const db = require("../config/db");

// ==============================
// Create Task
// ==============================
exports.createTask = (req, res) => {
    const {
        project_id,
        assigned_to,
        title,
        description,
        priority,
        status,
        due_date
    } = req.body;

    if (!project_id || !assigned_to || !title || !description || !due_date) {
        return res.status(400).json({
            success: false,
            message: "All required fields are mandatory"
        });
    }

    const sql = `
        INSERT INTO tasks
        (project_id, assigned_to, title, description, priority, status, due_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            project_id,
            assigned_to,
            title,
            description,
            priority || "Medium",
            status || "Pending",
            due_date
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
                message: "Task created successfully",
                taskId: result.insertId
            });
        }
    );
};

// ==============================
// Get All Tasks
// ==============================
exports.getTasks = (req, res) => {

    const sql = `
        SELECT
            t.*,
            p.title AS project_name,
            u.full_name AS assigned_to_name
        FROM tasks t
        JOIN projects p
            ON t.project_id = p.id
        JOIN users u
            ON t.assigned_to = u.id
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
            tasks: results
        });

    });

};

// ==============================
// Get Task By ID
// ==============================
exports.getTaskById = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            t.*,
            p.title AS project_name,
            u.full_name AS assigned_to_name
        FROM tasks t
        JOIN projects p
            ON t.project_id = p.id
        JOIN users u
            ON t.assigned_to = u.id
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
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            task: result[0]
        });

    });

};
// ==============================
// Update Task
// ==============================
exports.updateTask = (req, res) => {

    const { id } = req.params;

    const {
        project_id,
        assigned_to,
        title,
        description,
        priority,
        status,
        due_date
    } = req.body;

    const sql = `
        UPDATE tasks
        SET
            project_id=?,
            assigned_to=?,
            title=?,
            description=?,
            priority=?,
            status=?,
            due_date=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            project_id,
            assigned_to,
            title,
            description,
            priority,
            status,
            due_date,
            id
        ],
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
                    message: "Task not found"
                });
            }

            res.json({
                success: true,
                message: "Task updated successfully"
            });

        }
    );

};

// ==============================
// Delete Task
// ==============================
exports.deleteTask = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM tasks WHERE id=?",
        [id],
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
                    message: "Task not found"
                });
            }

            res.json({
                success: true,
                message: "Task deleted successfully"
            });

        }
    );

};