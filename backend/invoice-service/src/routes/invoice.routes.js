import express from 'express'
import * as invoiceController from '../controllers/invoice.controller.js'

import {
  checkInvoiceExists,
  validateRequest,
} from '../middlewares/validate-request.js'

import {
  detailInvoiceRequestValidation,
  downloadInvoiceRequestValidation,
} from '../validation/invoice.validation.js'
import { authorizeRoles } from 'ok-backend-common/middlewares/index.js'
import ROLES from 'ok-backend-common/constants/roles.js'

const InvoiceRouter = express.Router()

InvoiceRouter.get('/',
  authorizeRoles(ROLES.ADMIN),
  invoiceController.index
)

InvoiceRouter.get('/detail/:id',
  validateRequest(detailInvoiceRequestValidation),
  checkInvoiceExists,
  invoiceController.detail
)

InvoiceRouter.get('/download/:id',
  validateRequest(downloadInvoiceRequestValidation),
  checkInvoiceExists,
  invoiceController.download
)

export default InvoiceRouter