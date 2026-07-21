const db = require("../config/db");

// Create Bug
exports.createBug = (req, res) => {

    const {
        project_id,
        assigned_to,
        title,
        description,
        priority,
        status
    } = req.body;

    const reported_by = req.user.id;

    const screenshot = req.file ? req.file.path : null;

    const sql = `
        INSERT INTO bug_reports
        (project_id, reported_by, assigned_to, title, description, priority, status, screenshot)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            project_id,
            reported_by,
            assigned_to,
            title,
            description,
            priority,
            status,
            screenshot
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success:false,
                    message:err.message
                });
            }

            res.status(201).json({
                success:true,
                message:"Bug created successfully",
                bugId:result.insertId,
                screenshot
            });

        }
    );

};

// Get All Bugs
exports.getBugs = (req, res) => {

    const sql = `
        SELECT *
        FROM bug_reports
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, bugs) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            bugs
        });

    });

};

// Get Bug By ID
exports.getBugById = (req, res) => {

    const { id } = req.params;

    db.query(
        "SELECT * FROM bug_reports WHERE id=?",
        [id],
        (err, bug) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (bug.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Bug not found"
                });
            }

            res.json({
                success: true,
                bug: bug[0]
            });

        }
    );

};

// Update Bug
exports.updateBug = (req,res)=>{

    const {id}=req.params;

    const {
        project_id,
        assigned_to,
        title,
        description,
        priority,
        status
    }=req.body;

    const screenshot=req.file ? req.file.path : null;

    const sql=`
    UPDATE bug_reports
    SET
    project_id=?,
    assigned_to=?,
    title=?,
    description=?,
    priority=?,
    status=?,
    screenshot=COALESCE(?,screenshot)
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
            screenshot,
            id
        ],
        (err)=>{

            if(err){
                return res.status(500).json({
                    success:false,
                    message:err.message
                });
            }

            res.json({
                success:true,
                message:"Bug updated successfully"
            });

        }
    );

};
// Delete Bug
exports.deleteBug = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM bug_reports WHERE id=?",
        [id],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Bug deleted successfully"
            });

        }
    );

};

// Assign Bug
exports.assignBug = (req, res) => {

    const { id } = req.params;
    const { assigned_to } = req.body;

    db.query(
        "UPDATE bug_reports SET assigned_to=? WHERE id=?",
        [assigned_to, id],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Bug assigned successfully"
            });

        }
    );

};

// Update Bug Status
exports.updateBugStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    db.query(
        "UPDATE bug_reports SET status=? WHERE id=?",
        [status, id],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Bug status updated successfully"
            });

        }
    );

};