import { Joi } from "ok-backend-common/utils/joi.js";

const registerRequestValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginRequestValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPasswordRequestValidation = Joi.object({
  email: Joi.string().email().required(),
});

const changePasswordRequestValidation = Joi.object({
  password: Joi.string().required(),
});

export {
  registerRequestValidation,
  loginRequestValidation,
  forgotPasswordRequestValidation,
  changePasswordRequestValidation,
};
