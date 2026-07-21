const { body, validationResult } = require("express-validator");

exports.profileValidation = [

    body("full_name")
        .trim()
        .notEmpty()
        .withMessage("Full name is required"),

    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("phone")
        .optional()
        .isMobilePhone()
        .withMessage("Invalid phone number")
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