import { Router } from "express";
import {
  checkEmailExists,
  validateLogInData,
  validatePasswordsMatch,
  validateSignUpData,
} from "../middleware/auth.middleware.js";
import { logInServices, signUpServices } from "../services/auth.services.js";

const router = Router();

router
  .route("/signUp")
  .post(
    validateSignUpData,
    checkEmailExists,
    validatePasswordsMatch,
    signUpServices
  );

router.route("/logIn").post(validateLogInData, logInServices);

export default router;
