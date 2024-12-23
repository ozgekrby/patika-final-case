import express from "express";
import * as adminCategoryController from "../../controllers/admin/category.controller.js";

import {
  validateRequest,
  checkCategoryExists,
} from "../../middlewares/validate-request.js";

import {
  detailRequestValidation,
  createRequestValidation,
  updateRequestValidation,
  deleteRequestValidation,
} from "../../validation/admin/category.validation.js";

const AdminCategoryRouter = express.Router();

AdminCategoryRouter.get("/", adminCategoryController.index);

AdminCategoryRouter.get(
  "/detail/:id",
  validateRequest(detailRequestValidation),
  checkCategoryExists,
  adminCategoryController.detail
);

AdminCategoryRouter.post(
  "/create",
  validateRequest(createRequestValidation),
  adminCategoryController.create
);

AdminCategoryRouter.put(
  "/update/:id",
  validateRequest(updateRequestValidation),
  checkCategoryExists,
  adminCategoryController.update
);

AdminCategoryRouter.delete(
  "/delete/:id",
  validateRequest(deleteRequestValidation),
  checkCategoryExists,
  adminCategoryController.remove
);

export default AdminCategoryRouter;
