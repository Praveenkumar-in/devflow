const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const {
            full_name,
            email,
            password,
            role
        } = req.body;

        // Check required fields
        if (!full_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if email already exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Email already exists"
                    });
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert user
                db.query(
                    `INSERT INTO users (full_name,email,password,role)
                     VALUES (?,?,?,?)`,
                    [
                        full_name,
                        email,
                        hashedPassword,
                        role || "Developer"
                    ],
                    (err) => {

                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }

                        return res.status(201).json({
                            success: true,
                            message: "User registered successfully"
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, results) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                if (results.length === 0) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid email or password"
                    });
                }

                const user = results[0];

                // Compare password
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid email or password"
                    });
                }

                // Generate JWT
                const token = jwt.sign(
                    {
                        id: user.id,
                        role: user.role
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d"
                    }
                );

                // Return response
                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    token,
                    user: {
                        id: user.id,
                        full_name: user.full_name,
                        email: user.email,
                        role: user.role
                    }
                });
            }
        );

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};