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
    app.post('/api/customer/order', placeOrder);
    
    app.get('/api/customer/orders', getOrders);

    app.get('/api/customer/orders/track', getOrderByEmail);
    
    app.get('/api/customer/order/:order_id', getOrderDetail);
    
    app.delete('/api/customer/order/:order_id', cancelOrder);
};

module.exports = CustomerRoute;