import { catchAsyncError } from "ok-backend-common/utils/catch-async-error.js";

import { getReqUser } from "../utils/req.js";
import * as OrderService from "../services/order.service.js";
import * as UserService from "../services/user.service.js";
import { refreshAuthToken } from "../utils/jwt-token.js";
const profile = catchAsyncError(async (req, res, next) => {
  const user = await getReqUser(req);
  res.status(200).json({
    success: true,
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
  });
});

const orders = catchAsyncError(async (req, res, next) => {
  const user = await getReqUser(req);
  const orders = await OrderService.findByUser(user);
  res.status(200).json({
    success: true,
    data: {
      orders,
    },
  });
});

const update = catchAsyncError(async (req, res, next) => {
  const user = await UserService.findByEmail(req.user.email);

  try {
    const updatedUser = await UserService.update(user, req.body);
    const token = await refreshAuthToken(updatedUser, req.token);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          roles: updatedUser.roles,
        },
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
});

export { profile, orders, update };
