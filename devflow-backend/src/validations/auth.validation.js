const { body, validationResult } = require("express-validator");

exports.registerValidation = [
    body("full_name")
        .notEmpty()
        .withMessage("Full name is required"),

    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("role")
        .isIn(["Admin", "Developer"])
        .withMessage("Role must be Admin or Developer")
];

exports.loginValidation = [
    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];

exports.validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
};