const { body, validationResult } = require("express-validator");

exports.projectValidation = [
    body("name")
        .notEmpty()
        .withMessage("Project name is required"),

    body("description")
        .notEmpty()
        .withMessage("Project description is required"),

    body("status")
        .isIn(["Planning", "In Progress", "Completed"])
        .withMessage("Invalid project status")
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