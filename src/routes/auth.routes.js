import { Router } from "express";
import {
  checkEmailExists,
  validateLogInData,
  validatePasswordsMatch,
  validateSignUpData,
} from "../middleware/auth.middleware.js";
import {
  logInControllers,
  signUpControllers,
} from "../controllers/auth.controllers.js";

const router = Router();

router
  .route("/signUp")
  .post(
    validateSignUpData,
    checkEmailExists,
    validatePasswordsMatch,
    signUpControllers
  );

router.route("/logIn").post(validateLogInData, logInControllers);

export default router;
