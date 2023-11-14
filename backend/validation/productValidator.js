import { check } from "express-validator";

export const productValidator = () => {
  return [check("id").isNumeric().withMessage("Product ID must be a number")];
};

export const validateProduct = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Product Name is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Product Name should be 3-200 characters long"),
  check("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 1 })
    .withMessage("Price must be a non-negative number"),
];

export const validateUpdateProduct = [
  check("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product Name is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Product Name should be 3-200 characters long"),
  check("price")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 1 })
    .withMessage("Price must be a non-negative number"),
];
