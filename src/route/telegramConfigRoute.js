const { getAll, getByCode, create, update, delete: deleteConfig } = require('../controllers/telegramConfigController');

const TelegramConfig = (app) => {
  app.get('/api/telegram-config', getAll);
  app.get('/api/telegram-config/:code', getByCode);
  app.post('/api/telegram-config', create);
  app.put('/api/telegram-config/:code', update);
  app.delete('/api/telegram-config/:code', deleteConfig);
};

module.exports = TelegramConfig;
