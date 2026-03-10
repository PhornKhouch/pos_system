const { getAll, getById, create, update, delete: deleteAlert } = require('../controllers/setAlertController');

const SetAlert = (app) => {
  app.get('/api/alert-setting', getAll);
  app.get('/api/alert-setting/:id', getById);
  app.post('/api/alert-setting', create);
  app.put('/api/alert-setting/:id', update);
  app.delete('/api/alert-setting/:id', deleteAlert);
};

module.exports = SetAlert;
