import * as InvoiceService from '../services/invoice.service.js'
import {
  validateRequest,
} from 'ok-backend-common/middlewares/validate-request.js'

const checkInvoiceExists = async (req, res, next) => {
  const { id } = req.params;

  try {

    const invoice = await InvoiceService.findById(id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'invoice not found',
          code: 'INVOICE_NOT_FOUND',
        }
      });
    }
    req.foundInvoice = invoice;
    next();
  } catch (error) {
    next(error);
  }
};

export {
  validateRequest,
  checkInvoiceExists,
}
