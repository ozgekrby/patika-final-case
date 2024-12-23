import { Joi } from 'ok-backend-common/utils/joi.js'

const detailInvoiceRequestValidation = Joi.object({
  id: Joi.objectId().required(),
});

const downloadInvoiceRequestValidation = Joi.object({
  id: Joi.objectId().required(),
});

export {
  detailInvoiceRequestValidation,
  downloadInvoiceRequestValidation,
};
