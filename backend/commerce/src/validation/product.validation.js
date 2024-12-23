import { Joi } from "ok-backend-common/utils/joi.js";

const autoCompleteRequestValidation = Joi.object({
  q: Joi.string().required(),
});

const getBySlugRequestValidation = Joi.object({
  slug: Joi.string().required(),
});

export { autoCompleteRequestValidation, getBySlugRequestValidation };
