import { Router } from "express";
import {
  authenticateToken,
  authorizeRole,
  checkEmailExists,
  validatePasswordsMatch,
  validateSignUpData,
} from "../middleware/auth.middleware.js";
import { validateUserUpdateData } from "../middleware/users.middleware.js";
import {
  createUserController,
  deleteUserController,
  getAllUsersControllers,
  getMyProfileControllers,
  getUserByNameControllers,
  updateUserByIdControllers,
} from "../controllers/users.controllers.js";

const router = Router();

router.route("/my-profile").get(authenticateToken, getMyProfileControllers);

// (admin)

router
  .route("/create")
  .post(
    authenticateToken,
    authorizeRole(["admin"]),
    validateSignUpData,
    checkEmailExists,
    validatePasswordsMatch,
    createUserController
  );

router
  .route("/")
  .get(authenticateToken, authorizeRole(["admin"]), getAllUsersControllers);

router
  .route("/name/:full_name")
  .get(authenticateToken, authorizeRole(["admin"]), getUserByNameControllers);

router
  .route("/update/:id")
  .put(
    authenticateToken,
    authorizeRole(["admin"]),
    validateUserUpdateData,
    updateUserByIdControllers
  );

router
  .route("/delete/:id")
  .delete(authenticateToken, authorizeRole(["admin"]), deleteUserController);

export default router;
