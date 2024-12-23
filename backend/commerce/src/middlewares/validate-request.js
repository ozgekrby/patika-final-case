import * as UserService from "../services/user.service.js";
import * as CategoryService from "../services/category.service.js";
import * as OrderService from "../services/order.service.js";
import * as ProductService from "../services/product.service.js";
import { validateRequest } from "ok-backend-common/middlewares/validate-request.js";

const checkUserExists = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserService.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          message: "User not found",
          code: "USER_NOT_FOUND",
        },
      });
    }
    req.foundUser = user;
    next();
  } catch (error) {
    next(error);
  }
};

const checkCategoryExists = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await CategoryService.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Category not found",
          code: "CATEGORY_NOT_FOUND",
        },
      });
    }
    req.foundCategory = category;
    next();
  } catch (error) {
    next(error);
  }
};

const checkOrderExists = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await OrderService.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Order not found",
          code: "ORDER_NOT_FOUND",
        },
      });
    }
    req.foundOrder = order;
    next();
  } catch (error) {
    next(error);
  }
};

const checkProductExists = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await ProductService.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Product not found",
          code: "PRODUCT_NOT_FOUND",
        },
      });
    }
    req.foundProduct = product;
    next();
  } catch (error) {
    next(error);
  }
};

export {
  validateRequest,
  checkUserExists,
  checkCategoryExists,
  checkOrderExists,
  checkProductExists,
};
