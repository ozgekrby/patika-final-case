import express from "express";
import * as adminUserController from "../../controllers/admin/user.controller.js";

import {
  validateRequest,
  checkUserExists,
} from "../../middlewares/validate-request.js";

import {
  detailRequestValidation,
  updateRequestValidation,
} from "../../validation/user.validation.js";

import { authenticateToken } from "ok-backend-common/middlewares/auth.middleware.js";

const AdminUserRouter = express.Router();

AdminUserRouter.get("/", authenticateToken, adminUserController.index);

AdminUserRouter.get(
  "/detail/:id",
  validateRequest(detailRequestValidation),
  checkUserExists,
  adminUserController.detail
);

AdminUserRouter.put(
  "/update/:id",
  authenticateToken,
  validateRequest(updateRequestValidation),
  checkUserExists,
  adminUserController.update
);

export default AdminUserRouter;
