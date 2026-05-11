const Stripe = require('stripe');
const { MasterProduct } = require('../models');
const logError = require('../utils/logger');

const SHIPPING_OPTIONS = {
    standard: { label: 'Standard Shipping', price: 5 },
    express: { label: 'Express Shipping', price: 15 },
};

const TAX_RATE = 0.083;
const DEFAULT_FRONTEND_URL = 'http://localhost:5173';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_missing');

const toCents = (amount) => Math.round(Number(amount || 0) * 100);

const getFrontendUrl = () =>
    (process.env.FRONTEND_URL || process.env.CLIENT_URL || DEFAULT_FRONTEND_URL).replace(/\/$/, '');

const createCheckoutSession = async (req, res) => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                message: 'STRIPE_SECRET_KEY is not configured on the server'
            });
        }

        const {
            email,
            fullname,
            selectedShipping = 'standard',
            items = []
        } = req.body;

        if (!email || !fullname) {
            return res.status(400).json({
                success: false,
                message: 'Email and fullname are required'
            });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Checkout must contain at least one item'
            });
        }

        const lineItems = [];
        let subtotal = 0;

        for (const item of items) {
            const qty = Number(item.qty || 0);
            if (!item.prd_id || qty <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Each item must include prd_id and qty'
                });
            }

            const product = await MasterProduct.findByPk(item.prd_id);
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: `Product with ID ${item.prd_id} not found`
                });
            }

            if (Number(product.qty || 0) < qty) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product ${product.prd_name}. Available: ${product.qty}`
                });
            }

            const unitAmount = toCents(product.unit_cost);
            subtotal += Number(product.unit_cost || 0) * qty;

            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.prd_name || item.name || item.prd_id,
                    },
                    unit_amount: unitAmount
                },
                quantity: qty
            });
        }

        const shipping = SHIPPING_OPTIONS[selectedShipping] || SHIPPING_OPTIONS.standard;
        const taxes = subtotal * TAX_RATE;

        if (shipping.price > 0) {
            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: { name: shipping.label },
                    unit_amount: toCents(shipping.price)
                },
                quantity: 1
            });
        }

        if (taxes > 0) {
            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: { name: 'Taxes' },
                    unit_amount: toCents(taxes)
                },
                quantity: 1
            });
        }

        const frontendUrl = getFrontendUrl();
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            customer_email: email,
            line_items: lineItems,
            metadata: {
                fullname,
                selectedShipping,
                source: 'react-pos-checkout'
            },
            success_url: `${frontendUrl}/checkout?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontendUrl}/checkout?payment=cancel`
        });

        res.json({
            success: true,
            url: session.url,
            session_id: session.id
        });
    } catch (error) {
        logError('paywayController - createCheckoutSession', error, res);
    }
};

const getCheckoutSession = async (req, res) => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                message: 'STRIPE_SECRET_KEY is not configured on the server'
            });
        }

        const session = await stripe.checkout.sessions.retrieve(req.params.id, {
            expand: ['payment_intent.payment_method']
        });

        res.json({
            success: true,
            data: {
                id: session.id,
                amount_total: session.amount_total,
                currency: session.currency,
                payment_status: session.payment_status,
                customer_email: session.customer_details?.email || session.customer_email || null,
                card_brand: session.payment_intent?.payment_method?.card?.brand || null,
                last4: session.payment_intent?.payment_method?.card?.last4 || null
            }
        });
    } catch (error) {
        logError('paywayController - getCheckoutSession', error, res);
    }
};

const stripeWebhook = async (req, res) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const signature = req.headers['stripe-signature'];

    if (!webhookSecret) {
        return res.sendStatus(200);
    }

    try {
        const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            console.log(`Stripe checkout completed: ${session.id}`);
        }

        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
};

module.exports = {
    createCheckoutSession,
    getCheckoutSession,
    stripeWebhook
};
