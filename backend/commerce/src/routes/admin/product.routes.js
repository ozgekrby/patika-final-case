import express from "express";
import * as adminProductController from "../../controllers/admin/product.controller.js";

import {
  validateRequest,
  checkProductExists,
} from "../../middlewares/validate-request.js";

import {
  detailRequestValidation,
  createRequestValidation,
  updateRequestValidation,
  deleteRequestValidation,
} from "../../validation/admin/product.validation.js";

const AdminProductRouter = express.Router();

AdminProductRouter.get("/", adminProductController.index);

AdminProductRouter.get(
  "/detail/:id",
  validateRequest(detailRequestValidation),
  checkProductExists,
  adminProductController.detail
);

AdminProductRouter.post(
  "/create",
  validateRequest(createRequestValidation),
  adminProductController.create
);

AdminProductRouter.put(
  "/update/:id",
  validateRequest(updateRequestValidation),
  checkProductExists,
  adminProductController.update
);

AdminProductRouter.delete(
  "/delete/:id",
  validateRequest(deleteRequestValidation),
  checkProductExists,
  adminProductController.remove
);

export default AdminProductRouter;
