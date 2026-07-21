const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Get Profile
exports.getProfile = (req, res) => {

    const id = req.user.id;

    db.query(
        `SELECT id,
                full_name,
                email,
                role,
                profile_image,
                created_at
         FROM users
         WHERE id = ?`,
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                user: result[0]
            });

        }
    );

};

// Update Profile
exports.updateProfile = (req, res) => {

    const id = req.user.id;
    const { full_name, email } = req.body;

    db.query(
        "UPDATE users SET full_name=?, email=? WHERE id=?",
        [full_name, email, id],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Profile updated successfully"
            });

        }
    );

};
exports.uploadProfilePicture = (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Please upload an image"
        });
    }

    const id = req.user.id;

    db.query(
        "UPDATE users SET profile_image=? WHERE id=?",
        [req.file.path, id],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Profile picture uploaded successfully",
                imageUrl: req.file.path
            });

        }
    );

};
// Change Password
exports.changePassword = async (req, res) => {

    const id = req.user.id;
    const { oldPassword, newPassword } = req.body;

    db.query(
        "SELECT password FROM users WHERE id=?",
        [id],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            const valid = await bcrypt.compare(
                oldPassword,
                result[0].password
            );

            if (!valid) {
                return res.status(400).json({
                    success: false,
                    message: "Old password is incorrect"
                });
            }

            const hashed = await bcrypt.hash(newPassword, 10);

            db.query(
                "UPDATE users SET password=? WHERE id=?",
                [hashed, id],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    res.json({
                        success: true,
                        message: "Password changed successfully"
                    });

                }
            );

        }
    );

};