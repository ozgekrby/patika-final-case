import express from "express";
import * as adminAccountController from "../../controllers/admin/account.controller.js";

import { validateRequest } from "../../middlewares/validate-request.js";

import { updateAccountRequestValidation } from "../../validation/admin/account.validation.js";

const AdminAccountRouter = express.Router();

AdminAccountRouter.get("/profile", adminAccountController.profile);
AdminAccountRouter.put(
  "/update",
  validateRequest(updateAccountRequestValidation),
  adminAccountController.update
);

export default AdminAccountRouter;
