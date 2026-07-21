const { body, validationResult } = require("express-validator");

exports.teamValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Team name is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Team description is required")
];

exports.memberValidation = [

    body("user_id")
        .notEmpty()
        .withMessage("User ID is required")
        .isInt()
        .withMessage("User ID must be a number")
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