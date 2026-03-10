const PaymentMethod = require('../models/PaymentMethod');

// Get all payment methods
exports.getAll = async (req, res) => {
  try {
    const methods = await PaymentMethod.findAll();
    res.json(methods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get payment method by code
exports.getByCode = async (req, res) => {
  try {
    const method = await PaymentMethod.findOne({ where: { code: req.params.code } });
    if (!method) return res.status(404).json({ error: 'Not found' });
    res.json(method);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create payment method
exports.create = async (req, res) => {
  try {
    const { code, type, is_active, fee } = req.body;
    const method = await PaymentMethod.create({ code, type, is_active, fee });
    res.status(201).json(method);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update payment method
exports.update = async (req, res) => {
  try {
    const { type, is_active, fee } = req.body;
    const [updated] = await PaymentMethod.update(
      { type, is_active, fee },
      { where: { code: req.params.code } }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete payment method
exports.delete = async (req, res) => {
  try {
    const deleted = await PaymentMethod.destroy({ where: { code: req.params.code } });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
