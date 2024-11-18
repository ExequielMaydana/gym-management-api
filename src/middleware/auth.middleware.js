import { verifyToken } from "../utils/jwt.js";

import { body, validationResult } from "express-validator";
import Users from "../models/users.model.js";

export const validateSignUpData = [
  body("full_name")
    .notEmpty()
    .withMessage("Full name is required")
    .isString()
    .withMessage("Full name must be a string"),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isString()
    .withMessage("Phone must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
    .withMessage("Email must be a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirm_password")
    .notEmpty()
    .withMessage("confirming passwords is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("years")
    .notEmpty()
    .withMessage("Years is required")
    .isInt({ min: 18 })
    .withMessage("Years must be a valid number greater than or equal to 18"),
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const checkEmailExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const validatePasswordsMatch = (req, res, next) => {
  const { password, confirm_password } = req.body;

  if (!password || !confirm_password) {
    return res
      .status(400)
      .json({ message: "Both password and confirm password are required." });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match." });
  }
  next();
};

export const validateLogInData = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const authorizeRole = (rolesAllowed) => (req, res, next) => {
  const userRoles = req.user.roles;

  if (!rolesAllowed.some((role) => userRoles.includes(role))) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};

// export const authorizeAdmin = (req, res, next) => {
//   const userRoles = req.user?.roles || [];

//   if (!userRoles.includes("admin")) {
//     return res.status(403).json({ message: "Access denied. Admins only." });
//   }

//   next();
// };
