const { body, validationResult } = require("express-validator");

exports.taskValidation = [

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
        .withMessage("Task title is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Task description is required"),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Priority must be Low, Medium or High"),

    body("status")
        .optional()
        .isIn(["Pending", "In Progress", "Completed"])
        .withMessage("Status must be Pending, In Progress or Completed"),

    body("due_date")
        .notEmpty()
        .withMessage("Due date is required")
        .isISO8601()
        .withMessage("Due date must be a valid date")
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