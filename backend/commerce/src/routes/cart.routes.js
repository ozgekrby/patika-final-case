import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import {
  checkProductExists,
  validateRequest,
} from "../middlewares/validate-request.js";
import {
  addCartItemValidation,
  updateCartItemValidation,
  removeCartItemValidation,
} from "../validation/cart.validation.js";

const CartRouter = express.Router();

CartRouter.get("/", cartController.getCart);

CartRouter.post(
  "/add",
  validateRequest(addCartItemValidation),
  cartController.addToCart
);

CartRouter.put(
  "/update",
  validateRequest(updateCartItemValidation),
  cartController.updateCartItem
);

CartRouter.delete(
  "/remove/:id",
  validateRequest(removeCartItemValidation),
  checkProductExists,
  cartController.deleteCartItem
);

CartRouter.delete("/clear", cartController.clearCart);

export default CartRouter;
