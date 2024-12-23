import { Joi } from "ok-backend-common/utils/joi.js";

const updateAccountRequestValidation = Joi.object({
  email: Joi.string().email(),
  name: Joi.string().trim(),
  password: Joi.string(),
});

export { updateAccountRequestValidation };
