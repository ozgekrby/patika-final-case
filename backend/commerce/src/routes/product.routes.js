import express from "express";
import * as productController from "../controllers/product.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";

import {
  autoCompleteRequestValidation,
  getBySlugRequestValidation,
} from "../validation/product.validation.js";

const ProductRouter = express.Router();

ProductRouter.get("/search", productController.search);

ProductRouter.get(
  "/autocomplete",
  validateRequest(autoCompleteRequestValidation),
  productController.search
);

ProductRouter.get(
  "/:slug",
  validateRequest(getBySlugRequestValidation),
  productController.getBySlug
);

export default ProductRouter;
