import { catchAsyncError } from "ok-backend-common/utils/catch-async-error.js";
import * as OrderService from "../../services/order.service.js";

const index = catchAsyncError(async (req, res, next) => {
  const orders = await OrderService.findAll();

  res.status(200).json({
    success: true,
    data: {
      orders: orders,
    },
  });
});

const detail = catchAsyncError(async (req, res, next) => {
  const order = req.foundOrder;

  res.status(200).json({
    success: true,
    data: {
      order: order,
    },
  });
});

const update = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      order: {},
    },
  });
});

const deleteOrder = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      order: {},
    },
  });
});

export { index, detail, update, deleteOrder };
