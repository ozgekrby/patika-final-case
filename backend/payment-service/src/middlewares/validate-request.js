import * as PaymentService from '../services/payment.service.js'
import {
  validateRequest,
} from 'ok-backend-common/middlewares/validate-request.js'

const checkPaymentExists = async (req, res, next) => {
  const { id } = req.params;

  try {

    const payment = await PaymentService.findById(id);
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'payment not found',
          code: 'PAYMENT_NOT_FOUND',
        }
      });
    }
    req.foundPayment = payment;
    next();
  } catch (error) {
    next(error);
  }
};

export {
  validateRequest,
  checkPaymentExists,
}
