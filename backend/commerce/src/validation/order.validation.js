import { Joi } from "ok-backend-common/utils/joi.js";

const detailRequestValidation = Joi.object({
  id: Joi.objectId().required(),
});

export { detailRequestValidation };
