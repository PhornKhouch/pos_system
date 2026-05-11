const express = require('express');
const {
    createCheckoutSession,
    getCheckoutSession,
    stripeWebhook
} = require('../controllers/paywayController');

const PayWayRoute = (app) => {
    app.post('/api/payway/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
    app.post('/api/payway/create-checkout-session', express.json({ limit: '10mb' }), createCheckoutSession);
    app.get('/api/payway/checkout-session/:id', getCheckoutSession);
};

module.exports = PayWayRoute;
