import { Joi } from "ok-backend-common/utils/joi.js";

const detailRequestValidation = Joi.object({
  id: Joi.objectId().required(),
});

const updateRequestValidation = Joi.object({
  id: Joi.objectId().required(),
  email: Joi.string().email(),
  name: Joi.string().trim(),
  password: Joi.string(),
});

export { detailRequestValidation, updateRequestValidation };
