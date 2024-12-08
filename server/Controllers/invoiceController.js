const Invoice = require('../Models/invoiceModel');

// Get all invoices with pagination and filtering
// @desc    Get invoices with pagination and filtering
// @route   GET http://localhost:4000/api/invoices
// @access  Private
exports.getInvoices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.customerId) {
      query.customerId = req.query.customerId;
    }
    if (req.query.invoiceNumber) {
      query.invoiceNumber = { $regex: req.query.invoiceNumber, $options: 'i' };
    }
    if (req.query.startDate && req.query.endDate) {
      query.invoiceDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const invoices = await Invoice.find(query)
      .skip(skip)
      .limit(limit)
      .populate('customerId', 'name')
      .populate('orderId', 'orderNumber');

    const totalInvoices = await Invoice.countDocuments(query);

    res.json({
      invoices,
      totalPages: Math.ceil(totalInvoices / limit),
      currentPage: page,
      totalInvoices
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new invoice
// @desc    Create a new invoice
// @route   POST http://localhost:4000/api/invoices
// @access  Private
exports.createInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing invoice
// @desc    Update an existing invoice
// @route   PUT http://localhost:4000/api/invoices/:id
// @access  Private
exports.updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(updatedInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a specific invoice by ID
// @desc    Get a specific invoice by ID
// @route   GET http://localhost:4000/api/invoices/:id
// @access  Private
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('customerId', 'name')
      .populate('orderId', 'orderNumber');
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an invoice
// @desc    Delete an invoice
// @route   DELETE http://localhost:4000/api/invoices/:id
// @access  Private
exports.deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
