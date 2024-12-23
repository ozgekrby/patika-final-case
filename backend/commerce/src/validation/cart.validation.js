import { Joi } from "ok-backend-common/utils/joi.js";
import * as ProductService from "../services/product.service.js";

const validateProduct = async (value, helpers) => {
  const product = await ProductService.findById(value);
  if (!product) {
    throw new Error("Product not found");
  }
  return value;
};

const validateQuantity = async (value, helpers) => {
  const product = await ProductService.findById(
    helpers.state.ancestors[0].product
  );
  if (value > product.stockQuantity) {
    throw new Error("Insufficient stock quantity");
  }
  return value;
};

const addCartItemValidation = Joi.object({
  product: Joi.objectId().required().external(validateProduct),
  quantity: Joi.number().integer().min(1).required().external(validateQuantity),
});

const updateCartItemValidation = Joi.object({
  product: Joi.objectId().required().external(validateProduct),
  quantity: Joi.number().integer().min(1).required().external(validateQuantity),
});

const removeCartItemValidation = Joi.object({
  id: Joi.objectId().required(),
});

export {
  addCartItemValidation,
  updateCartItemValidation,
  removeCartItemValidation,
};
