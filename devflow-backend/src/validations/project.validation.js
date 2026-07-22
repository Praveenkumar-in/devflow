const { body, validationResult } = require("express-validator");

exports.projectValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Project description is required"),

  body("status")
    .isIn([
      "Planning",
      "Active",
      "Completed",
      "On Hold"
    ])
    .withMessage("Invalid project status"),

  body("deadline")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid deadline")
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};