const {
    // Dashboard
    getDashboardStats,
    
    // Sales
    getSalesSummary,
    getSalesByPaymentMethod,
    
    // Products
    getTopSellingProducts,
    getLowStockProducts,
    getProductsByCategory,
    getInventorySummary,
    
    // Orders
    getRecentOrders,
    getOrdersSummary,
    
    // Customers
    getCustomerStats,

    // Sale Table Reports
    getMonthlySales,
    getSalesPaymentMethodFromSale,
    getDailySales
} = require('../controllers/reportController');

const { validate_token } = require('../middleware/auth');

const Report = (app) => {
    // ================== DASHBOARD ==================
    app.get('/api/report/dashboard', getDashboardStats);
    
    // ================== SALES REPORTS ==================
    // Get sales summary by period (daily, weekly, monthly)
    // Query params: period (daily|weekly|monthly), startDate, endDate
    app.get('/api/report/sales', getSalesSummary);
    
    // Get sales grouped by payment method
    app.get('/api/report/sales/payment-methods', getSalesByPaymentMethod);
    
    // ================== PRODUCT REPORTS ==================
    // Get top selling products
    // Query params: limit (default: 10)
    app.get('/api/report/products/top-selling', getTopSellingProducts);
    
    // Get low stock products
    // Query params: threshold (default: 10)
    app.get('/api/report/products/low-stock', getLowStockProducts);
    
    // Get products count by category
    app.get('/api/report/products/by-category', getProductsByCategory);
    
    // Get inventory summary
    app.get('/api/report/inventory', getInventorySummary);
    
    // ================== ORDER REPORTS ==================
    // Get recent orders
    // Query params: limit (default: 10)
    app.get('/api/report/orders/recent', getRecentOrders);
    
    // Get orders summary (today, week, month, total)
    app.get('/api/report/orders/summary', getOrdersSummary);
    
    // ================== CUSTOMER REPORTS ==================
    // Get customer statistics and top customers
    app.get('/api/report/customers', getCustomerStats);

    // ================== SALE TABLE REPORTS ==================
    // Get monthly sales from tbl_sale
    // Query params: year (default: current year)
    app.get('/api/report/sale/monthly', getMonthlySales);
    
    // Get sales by payment method from tbl_sale
    // Query params: year (default: current year)
    app.get('/api/report/sale/payment-methods', getSalesPaymentMethodFromSale);
    
    // Get daily sales from tbl_sale
    // Query params: month, year (default: current month/year)
    app.get('/api/report/sale/daily', getDailySales);
};

module.exports = Report;
