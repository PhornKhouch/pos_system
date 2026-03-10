const { getAll, getByCode, create, update, delete: deleteMethod } = require('../controllers/paymentMethodController');

const PaymentMethod = (app) => {
  app.get('/api/payment-method', getAll);
  app.get('/api/payment-method/:code', getByCode);
  app.post('/api/payment-method', create);
  app.put('/api/payment-method/:code', update);
  app.delete('/api/payment-method/:code', deleteMethod);
};

module.exports = PaymentMethod;
