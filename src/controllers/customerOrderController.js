const { Order, OrderItem, MasterProduct, Customer } = require('../models');
const logError = require('../utils/logger');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config();

// Token secret (matching middleware)
const TOKEN_SECRET = "ICE_TEA_SECRET_KEY2376428343284jkfsdf";

// Helper function to get customer from token
const getCustomerFromToken = (req) => {
    const authorization = req.headers.authorization;
    if (!authorization) return null;
    
    const token = authorization.split(" ")[1];
    if (!token) return null;
    
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};

// Generate unique order ID
const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    return `ORD${timestamp}${random}`.toUpperCase();
};

// Place a new order (Checkout)
const placeOrder = async (req, res) => {
    try {
        console.log('=== placeOrder START ===');
        console.log('[1] Request body:', JSON.stringify(req.body, null, 2));

        const customer = getCustomerFromToken(req);
        console.log('[2] Decoded token customer:', customer);
        
        const { 
            email, 
            fullname, 
            adress, 
            postalcode, 
            status_payment, 
            items // Array of { prd_id, qty, unit_price }
        } = req.body;

        // Validate required fields
        if (!email || !fullname || !adress || !postalcode) {
            return res.status(400).json({
                success: false,
                message: 'Email, fullname, address and postal code are required'
            });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Order must contain at least one item'
            });
        }

        // Validate all products exist and have enough stock
        let totalAmount = 0;
        const validatedItems = [];

        for (const item of items) {
            console.log(`[3] Looking up product prd_id: "${item.prd_id}"`);
            const product = await MasterProduct.findByPk(item.prd_id);
            console.log(`[3] Product found:`, product ? `${product.prd_name} (qty: ${product.qty})` : 'NOT FOUND');
            
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: `Product with ID ${item.prd_id} not found`
                });
            }

            if (product.qty < item.qty) {
                console.log(`[3] Insufficient stock: available ${product.qty}, requested ${item.qty}`);
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product ${product.prd_name}. Available: ${product.qty}`
                });
            }

            const itemTotal = item.qty * (item.unit_price || product.unit_cost);
            totalAmount += itemTotal;

            validatedItems.push({
                product,
                qty: item.qty,
                unit_price: item.unit_price || product.unit_cost
            });
        }

        // Verify customer exists in DB before linking (avoids FK constraint failure)
        let validCustomerId = null;
        if (customer && customer.customer_id) {
            console.log(`[4] Verifying customer_id "${customer.customer_id}" exists in DB...`);
            const existingCustomer = await Customer.findByPk(customer.customer_id);
            console.log(`[4] Customer found:`, existingCustomer ? existingCustomer.customer_id : 'NOT FOUND — will use null');
            if (existingCustomer) {
                validCustomerId = customer.customer_id;
            }
        } else {
            console.log('[4] No token / no customer_id — guest order');
        }

        // Create order
        const order_id = generateOrderId();
        console.log(`[5] Creating order: ${order_id}, customer_id: ${validCustomerId}, amount: ${totalAmount}`);
        const order = await Order.create({
            order_id,
            email,
            fullname,
            adress,
            postalcode,
            customer_id: validCustomerId,
            amount: totalAmount,
            status_payment: status_payment || 'ABA',
            created_by: validCustomerId || 'guest',
            created_on: new Date()
        });

        // Create order items and update product stock
        for (const item of validatedItems) {
            await OrderItem.create({
                order_id,
                prd_id: item.product.prd_id,
                unit_price: item.unit_price,
                qty: item.qty
            });

            // Reduce product stock
            item.product.qty = item.product.qty - item.qty;
            await item.product.save();
        }

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: {
                order_id,
                amount: totalAmount,
                items_count: validatedItems.length,
                status_payment
            }
        });
        console.log('=== placeOrder SUCCESS ===');

    } catch (error) {
        console.error('=== placeOrder ERROR ===', error.message);
        console.error(error.stack);
        logError("customerOrderController - placeOrder", error, res);
    }
};

// Get all orders for a customer
const getOrders = async (req, res) => {
    try {
        const customer = getCustomerFromToken(req);
        
        if (!customer) {
            return res.status(401).json({
                success: false,
                message: 'Please login to view your orders'
            });
        }

        const orders = await Order.findAll({
            where: { customer_id: customer.customer_id },
            include: [{
                model: OrderItem,
                include: [{
                    model: MasterProduct,
                    attributes: ['prd_id', 'prd_name', 'photo']
                }]
            }],
            order: [['created_on', 'DESC']]
        });

        res.json({
            success: true,
            data: orders,
            count: orders.length
        });

    } catch (error) {
        logError("customerOrderController - getOrders", error, res);
    }
};

// Get specific order detail
const getOrderDetail = async (req, res) => {
    try {
        const { order_id } = req.params;
        const customer = getCustomerFromToken(req);

        const order = await Order.findOne({
            where: { order_id },
            include: [{
                model: OrderItem,
                include: [{
                    model: MasterProduct,
                    attributes: ['prd_id', 'prd_name', 'photo', 'category_id', 'brand_id']
                }]
            }]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // If logged in, verify order belongs to customer
        if (customer && order.customer_id && order.customer_id !== customer.customer_id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        res.json({
            success: true,
            data: order
        });

    } catch (error) {
        logError("customerOrderController - getOrderDetail", error, res);
    }
};

// Cancel order
const cancelOrder = async (req, res) => {
    try {
        const { order_id } = req.params;
        const customer = getCustomerFromToken(req);

        if (!customer) {
            return res.status(401).json({
                success: false,
                message: 'Please login to cancel orders'
            });
        }

        const order = await Order.findOne({
            where: { 
                order_id,
                customer_id: customer.customer_id 
            },
            include: [{ model: OrderItem }]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found or does not belong to you'
            });
        }

        // Restore product stock
        for (const item of order.tbl_order_items) {
            const product = await MasterProduct.findByPk(item.prd_id);
            if (product) {
                product.qty = product.qty + item.qty;
                await product.save();
            }
        }

        // Delete order items first (due to foreign key)
        await OrderItem.destroy({ where: { order_id } });
        
        // Delete order
        await order.destroy();

        res.json({
            success: true,
            message: 'Order cancelled successfully'
        });

    } catch (error) {
        logError("customerOrderController - cancelOrder", error, res);
    }
};

// Get order by email (for guest checkout tracking)
const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const orders = await Order.findAll({
            where: { email },
            include: [{
                model: OrderItem,
                include: [{
                    model: MasterProduct,
                    attributes: ['prd_id', 'prd_name', 'photo']
                }]
            }],
            order: [['created_on', 'DESC']]
        });

        res.json({
            success: true,
            data: orders,
            count: orders.length
        });

    } catch (error) {
        logError("customerOrderController - getOrderByEmail", error, res);
    }
};

module.exports = {
    placeOrder,
    getOrders,
    getOrderDetail,
    cancelOrder,
    getOrderByEmail
};
