import { Joi } from "ok-backend-common/utils/joi.js";

const getBySlugRequestValidation = Joi.object({
  slug: Joi.string().required(),
});

export { getBySlugRequestValidation };
