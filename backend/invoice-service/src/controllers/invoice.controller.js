import { catchAsyncError } from 'ok-backend-common/utils/catch-async-error.js'
import * as InvoiceService from '../services/invoice.service.js'

const index = catchAsyncError(async (req, res, next) => {
  const invoices = await InvoiceService.findAll()
  res.status(200).json({
    success: true,
    data: {
      invoices
    }
  })
})

const download = catchAsyncError(async (req, res, next) => {
  const invoice = req.foundInvoice;
  res.status(200).json({
    success: true,
    data: {
      file: invoice.file
    }
  })
})

const detail = catchAsyncError(async (req, res, next) => {
  const invoice = req.foundInvoice;
  res.status(200).json({
    success: true,
    data: {
      invoice
    }
  })
})

export {
  index,
  download,
  detail,
}