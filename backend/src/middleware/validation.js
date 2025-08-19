import { body, validationResult } from "express-validator";

export const validateForm = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("fields").isArray().withMessage("Fields must be an array"),
  body("fields.*.type").notEmpty().withMessage("Field type is required"),
  body("fields.*.label").notEmpty().withMessage("Field label is required"),
  body("fields.*.required")
    .optional()
    .isBoolean()
    .withMessage("Required must be a boolean"),
  body("submissionLimit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Submission limit must be a positive integer"),
];

export const validateSubmission = [
  body("formId").notEmpty().withMessage("Form ID is required"),
  body("responses").isArray().withMessage("Responses must be an array"),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
