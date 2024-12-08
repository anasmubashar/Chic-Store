const express = require('express');
const router = express.Router();
const {
  getInvoices,
  createInvoice,
  getInvoiceById,
  updateInvoice,
  deleteInvoice
} = require('../Controllers/invoiceController');
//const { protect, adminOnly } = require('../Middlewares/AuthMiddleware');

router.route('/')
  .get( getInvoices)
  .post(createInvoice);

router.route('/:id')
  .get( getInvoiceById)
  .put( updateInvoice)
  .delete( deleteInvoice);

module.exports = router;