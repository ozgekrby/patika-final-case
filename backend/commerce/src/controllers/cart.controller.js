import { catchAsyncError } from "ok-backend-common/utils/catch-async-error.js";
import * as CartService from "../services/cart.service.js";
import * as ProductService from "../services/product.service.js";
import { getReqUser } from "../utils/req.js";

const getCart = catchAsyncError(async (req, res, next) => {
  const user = await getReqUser(req);
  const cart = await CartService.getCart(user);
  res.status(200).json({
    success: true,
    data: {
      cart,
    },
  });
});

const addToCart = catchAsyncError(async (req, res, next) => {
  const user = await getReqUser(req);
  const product = await ProductService.findById(req.body.product);
  const cart = await CartService.addItemToCart(
    user,
    product,
    req.body.quantity
  );
  res.status(200).json({
    success: true,
    data: {
      cart,
    },
  });
});

const updateCartItem = catchAsyncError(async (req, res, next) => {
  const user = await getReqUser(req);
  const product = await ProductService.findById(req.body.product);
  const cart = await CartService.updateCartItem(
    user,
    product,
    req.body.quantity
  );
  res.status(200).json({
    success: true,
    data: {
      cart,
    },
  });
});

const deleteCartItem = catchAsyncError(async (req, res, next) => {
  const user = await getReqUser(req);
  const product = req.foundProduct;
  const cart = await CartService.removeItemFromCart(user, product);
  res.status(200).json({
    success: true,
    data: cart,
  });
});

const clearCart = catchAsyncError(async (req, res, next) => {
  const user = await getReqUser(req);
  await CartService.clearCart(user);
  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
  });
});

export { getCart, addToCart, updateCartItem, deleteCartItem, clearCart };
