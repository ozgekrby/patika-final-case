import express from "express";
import { validateRequest } from "ok-backend-common/middlewares/index.js";
import { getBySlugRequestValidation } from "../validation/category.validation.js";
import * as categoryController from "../controllers/category.controller.js";

const CategoryRouter = express.Router();

CategoryRouter.get(
  "/:slug",
  validateRequest(getBySlugRequestValidation),
  categoryController.getBySlug
);

export default CategoryRouter;
