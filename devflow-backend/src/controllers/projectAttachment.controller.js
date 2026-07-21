const db = require("../config/db");

exports.uploadAttachment = (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Please upload a file"
        });
    }

    const { id } = req.params;

    const uploaded_by = req.user.id;

    const file_name = req.file.originalname;
    const file_url = req.file.path;

    db.query(
        `INSERT INTO project_attachments
        (project_id, uploaded_by, file_name, file_url)
        VALUES (?, ?, ?, ?)`,
        [id, uploaded_by, file_name, file_url],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Attachment uploaded successfully",
                attachmentId: result.insertId,
                file_url
            });
        }
    );
};

exports.getAttachments = (req, res) => {

    const { id } = req.params;

    db.query(
        "SELECT * FROM project_attachments WHERE project_id=?",
        [id],
        (err, attachments) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                attachments
            });
        }
    );
};