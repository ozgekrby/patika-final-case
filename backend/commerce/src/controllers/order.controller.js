import { catchAsyncError } from "ok-backend-common/utils/catch-async-error.js";

import { getReqUser } from "../utils/req.js";
import * as OrderService from "../services/order.service.js";
import * as CartService from "../services/cart.service.js";
import { AccessDeniedError } from "ok-backend-common/errors/index.js";
import { generateOrderNumber } from "ok-backend-common/utils/string.js";

const index = catchAsyncError(async (req, res, next) => {
  const user = await getReqUser(req);
  const orders = await OrderService.findByUser(user);
  res.status(200).json({
    success: true,
    data: {
      orders,
    },
  });
});

const detail = catchAsyncError(async (req, res, next) => {
  const order = req.foundOrder;

  if (req.user.id !== order.user._id.toString()) {
    return next(new AccessDeniedError());
  }

  res.status(200).json({
    success: true,
    data: {
      order,
    },
  });
});

const create = catchAsyncError(async (req, res, next) => {
  const user = await getReqUser(req);
  const billingAddress = {
    street: req.body.address,
    city: req.body.city,
    state: req.body.region,
    postalCode: req.body.postalCode,
    country: "Turkey",
  };
  const order = await CartService.toOrder(user, billingAddress);
  res.status(200).json({
    success: true,
    data: {
      order,
    },
  });
});
export { index, detail, create };
