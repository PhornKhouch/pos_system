const GeneralSetting = require('../models/GeneralSetting');

// Get all alert settings
exports.getAll = async (req, res) => {
  try {
    const settings = await GeneralSetting.findAll();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get alert setting by id
exports.getById = async (req, res) => {
  try {
    const setting = await GeneralSetting.findOne({ where: { id: req.params.id } });
    if (!setting) return res.status(404).json({ error: 'Not found' });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create alert setting
exports.create = async (req, res) => {
  try {
    const { Stock_alert, Qty_alert, remark, is_alert } = req.body;
    const setting = await GeneralSetting.create({ Stock_alert, Qty_alert, remark, is_alert });
    res.status(201).json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update alert setting
exports.update = async (req, res) => {
  try {
    const { Stock_alert, Qty_alert, remark, is_alert } = req.body;
    const [updated] = await GeneralSetting.update(
      { Stock_alert, Qty_alert, remark, is_alert },
      { where: { id: req.params.id } }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete alert setting
exports.delete = async (req, res) => {
  try {
    const deleted = await GeneralSetting.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
