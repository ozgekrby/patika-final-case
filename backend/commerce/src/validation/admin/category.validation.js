import { Joi } from "ok-backend-common/utils/joi.js";

const detailRequestValidation = Joi.object({
  id: Joi.objectId().required(),
});

const createRequestValidation = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim(),
  slug: Joi.string().trim().optional(),
});

const updateRequestValidation = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().trim().required(),
  description: Joi.string().trim(),
  slug: Joi.string().trim().optional(),
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
