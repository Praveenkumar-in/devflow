const db = require("../config/db");

// Create Notification
exports.createNotification = (req, res) => {

    const { user_id, title, message } = req.body;

    const sql = `
        INSERT INTO notifications
        (user_id, title, message)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [user_id, title, message], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            notificationId: result.insertId
        });

    });

};

// Get Notifications of Logged-in User
exports.getNotifications = (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT *
        FROM notifications
        WHERE user_id=?
        ORDER BY created_at DESC
    `;

    db.query(sql, [user_id], (err, notifications) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            notifications
        });

    });

};

// Mark Notification as Read
exports.markAsRead = (req, res) => {

    const { id } = req.params;

    db.query(
        "UPDATE notifications SET is_read=1 WHERE id=?",
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
                message: "Notification marked as read"
            });

        }
    );

};

// Delete Notification
exports.deleteNotification = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM notifications WHERE id=?",
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
                message: "Notification deleted successfully"
            });

        }
    );

};