import { Joi } from 'ok-backend-common/utils/joi.js'

const createPaymentRequestValidation = Joi.object({
  orderId: Joi.objectId().required(),
});

const orderPaymentsRequestValidation = Joi.object({
  orderId: Joi.objectId().required(),
});

const detailPaymentRequestValidation = Joi.object({
  id: Joi.objectId().required(),
});

export {
  detailPaymentRequestValidation,
  orderPaymentsRequestValidation,
  createPaymentRequestValidation,
};
