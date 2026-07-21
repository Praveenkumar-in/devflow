const { body, validationResult } = require("express-validator");

exports.bugValidation = [

    body("project_id")
        .notEmpty()
        .withMessage("Project ID is required")
        .isInt()
        .withMessage("Project ID must be a number"),

    body("assigned_to")
        .notEmpty()
        .withMessage("Assigned user is required")
        .isInt()
        .withMessage("Assigned user must be a number"),

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Bug title is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Bug description is required"),

    body("priority")
        .isIn(["Low", "Medium", "High"])
        .withMessage("Priority must be Low, Medium or High"),

    body("status")
        .isIn(["Open", "In Progress", "Resolved", "Closed"])
        .withMessage("Invalid bug status")
];

exports.assignValidation = [

    body("assigned_to")
        .notEmpty()
        .withMessage("Assigned user is required")
        .isInt()
        .withMessage("Assigned user must be a number")
];

exports.statusValidation = [

    body("status")
        .isIn(["Open", "In Progress", "Resolved", "Closed"])
        .withMessage("Invalid bug status")
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