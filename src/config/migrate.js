const { sequelize, Brand, Category, Customer, GeneralSetting, MasterProduct, Order, OrderItem, PaymentMethod, Sale, SaleItemDetail, Setting, StoreInfor, Telegram, User } = require('../models');

const migrate = async () => {
    try {
        // Authenticate database connection
        await sequelize.authenticate();
        console.log('✓ Database connection authenticated');
        
        // Sync all models with database
        await sequelize.sync({ alter: true });
        console.log('✓ Database synchronized successfully');
        return true;
    } catch (error) {
        console.error('✗ Error syncing database:', error.message);
        throw error;
    }
}

module.exports = migrate;