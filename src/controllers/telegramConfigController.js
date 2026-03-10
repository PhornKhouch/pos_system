const Telegram = require('../models/Telegram');

// Get all telegram configs
exports.getAll = async (req, res) => {
  try {
    const configs = await Telegram.findAll();
    res.json(configs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get telegram config by tel_id
exports.getByCode = async (req, res) => {
  try {
    const config = await Telegram.findOne({ where: { tel_id: req.params.code } });
    if (!config) return res.status(404).json({ error: 'Not found' });
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create telegram config
exports.create = async (req, res) => {
  try {
    const { tel_id, token, group_id, status, is_alert } = req.body;
    const config = await Telegram.create({ tel_id, token, group_id, status, is_alert });
    res.status(201).json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update telegram config
exports.update = async (req, res) => {
  try {
    const { token, group_id, status, is_alert } = req.body;
    const [updated] = await Telegram.update(
      { token, group_id, status, is_alert },
      { where: { tel_id: req.params.code } }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete telegram config
exports.delete = async (req, res) => {
  try {
    const deleted = await Telegram.destroy({ where: { tel_id: req.params.code } });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
