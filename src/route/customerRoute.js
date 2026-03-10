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

const Customer = (app) => {
    // Authentication routes (public)
    app.post('/api/customer/register', register);
    app.post('/api/customer/login', login);
    
    // Customer management routes
    app.get('/api/customer', get);
    app.get('/api/customer/search', search);
    app.get('/api/customer/profile', getProfile);
    app.get('/api/customer/:id', getOne);
    app.put('/api/customer', update);
    app.put('/api/customer/change-password', changePassword);
    app.delete('/api/customer/:id', deleteCustomer);
};

module.exports = Customer;