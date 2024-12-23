import express from "express";
import * as authController from "../controllers/auth.controller.js";
import ROLES from "ok-backend-common/constants/roles.js";
import { validateRequest } from "../middlewares/validate-request.js";

import {
  registerRequestValidation,
  loginRequestValidation,
  changePasswordRequestValidation,
  forgotPasswordRequestValidation,
} from "../validation/auth.validation.js";

import {
  authenticateToken,
  authorizeRoles,
} from "ok-backend-common/middlewares/auth.middleware.js";

const AuthRouter = express.Router();

AuthRouter.post(
  "/register",
  validateRequest(registerRequestValidation),
  authController.register
);

AuthRouter.post(
  "/login",
  validateRequest(loginRequestValidation),
  authController.login
);

AuthRouter.post("/verify-otp", authController.verifyOtp);
AuthRouter.post("/resend-otp", authController.resendOtp);
AuthRouter.post(
  "/forgot-password",
  validateRequest(forgotPasswordRequestValidation),
  authController.forgotPassword
);
AuthRouter.post(
  "/reset-password",
  validateRequest(changePasswordRequestValidation),
  authController.resetPassword
);

AuthRouter.get("/check-auth", authenticateToken, authController.checkAuth);

AuthRouter.get("/logout", authenticateToken, authController.logout);

export default AuthRouter;
