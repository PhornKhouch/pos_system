const { 
    register, 
    login, 
    get, 
    getOne, 
    search, 
    update, 
    changePassword, 
    deleteCustomer, 
    getProfile 
} = require('../controllers/customerController');

const {
    placeOrder,
    getOrders,
    getOrderDetail,
    cancelOrder,
    getOrderByEmail
} = require('../controllers/customerOrderController');

const CustomerRoute = (app) => {
    // ================== CUSTOMER AUTHENTICATION (Public) ==================
    app.post('/api/customer/register', register);
    app.post('/api/customer/login', login);
    
    // ================== CUSTOMER MANAGEMENT ==================
    app.get('/api/customer', get);
    app.get('/api/customer/search', search);
    app.get('/api/customer/profile', getProfile);
    app.get('/api/customer/:id', getOne);
    app.put('/api/customer', update);
    app.put('/api/customer/change-password', changePassword);
    app.delete('/api/customer/:id', deleteCustomer);

    // ================== CUSTOMER ORDERS (Frontend Checkout) ==================
    // Place a new order (checkout) - supports both guest and logged-in customers
    app.post('/api/customer/order', placeOrder);
    
    // Get all orders for logged-in customer
    app.get('/api/customer/orders', getOrders);
    
    // Get orders by email (for guest order tracking)
    app.get('/api/customer/orders/track', getOrderByEmail);
    
    // Get specific order detail
    app.get('/api/customer/order/:order_id', getOrderDetail);
    
    // Cancel an order (logged-in customer only)
    app.delete('/api/customer/order/:order_id', cancelOrder);
};

module.exports = CustomerRoute;