import express from "express";
import * as orderController from "../controllers/order.controller.js";

import { detailRequestValidation } from "../validation/order.validation.js";
import { validateRequest } from "ok-backend-common/middlewares/index.js";
import { checkOrderExists } from "../middlewares/validate-request.js";

const OrderRouter = express.Router();

OrderRouter.get("/", orderController.index);

OrderRouter.post("/create", orderController.create);

OrderRouter.get(
  "/:id",
  validateRequest(detailRequestValidation),
  checkOrderExists,
  orderController.detail
);

export default OrderRouter;
