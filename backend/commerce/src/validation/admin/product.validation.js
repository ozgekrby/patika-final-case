import { Joi } from "ok-backend-common/utils/joi.js";
import * as CategoryService from "../../services/category.service.js";

const validateCategory = async (value, helpers) => {
  const category = await CategoryService.findById(value);
  if (!category) {
    throw new Error("Category not found");
  }
  return value;
};

const detailRequestValidation = Joi.object({
  id: Joi.objectId().required(),
});

const createRequestValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  slug: Joi.string().trim().optional(),
  category: Joi.objectId().required().external(validateCategory),
  price: Joi.number().required(),
  discountPercentage: Joi.number().default(0),
  stockQuantity: Joi.number().required(),
  thumbnail: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
});

const updateRequestValidation = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  slug: Joi.string().trim().optional(),
  category: Joi.objectId().required().external(validateCategory),
  price: Joi.number().optional(),
  discountPercentage: Joi.number().optional(),
  stockQuantity: Joi.number().optional(),
  thumbnail: Joi.string().optional(),
  images: Joi.array().items(Joi.string()).optional(),
});

const deleteRequestValidation = Joi.object({
  id: Joi.objectId().required(),
});

export {
  detailRequestValidation,
  createRequestValidation,
  updateRequestValidation,
  deleteRequestValidation,
};
