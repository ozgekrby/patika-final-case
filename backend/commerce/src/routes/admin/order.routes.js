import express from "express";
import * as adminOrderController from "../../controllers/admin/order.controller.js";

import { validateRequest } from "../../middlewares/validate-request.js";

import {
  checkOrderExists,
  checkCategoryExists,
} from "../../middlewares/validate-request.js";

import {
  detailRequestValidation,
  updateRequestValidation,
} from "../../validation/admin/order.validation.js";

const AdminOrderRouter = express.Router();

AdminOrderRouter.get("/", adminOrderController.index);

AdminOrderRouter.get(
  "/detail/:id",
  validateRequest(detailRequestValidation),
  checkCategoryExists,
  adminOrderController.detail
);

AdminOrderRouter.put(
  "/update/:id",
  validateRequest(updateRequestValidation),
  checkOrderExists,
  adminOrderController.update
);

export default AdminOrderRouter;
