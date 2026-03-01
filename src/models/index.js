const sequelize = require('../config/sequelizeConfig');

// Import all models
const Brand = require('./Brand');
const Category = require('./Category');
const Customer = require('./Customer');
const GeneralSetting = require('./GeneralSetting');
const MasterProduct = require('./MasterProduct');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const PaymentMethod = require('./PaymentMethod');
const Sale = require('./Sale');
const SaleItemDetail = require('./SaleItemDetail');
const Setting = require('./Setting');
const StoreInfor = require('./StoreInfor');
const Telegram = require('./Telegram');
const User = require('./User');

// Define associations
// Brand associations
Brand.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'code' });
Category.hasMany(Brand, { foreignKey: 'category_id', sourceKey: 'code' });

Brand.hasMany(MasterProduct, { foreignKey: 'brand_id', sourceKey: 'code' });
MasterProduct.belongsTo(Brand, { foreignKey: 'brand_id', targetKey: 'code' });

// MasterProduct associations
MasterProduct.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'code' });
Category.hasMany(MasterProduct, { foreignKey: 'category_id', sourceKey: 'code' });


// Order associations
Order.hasMany(OrderItem, { foreignKey: 'order_id', sourceKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', targetKey: 'order_id' });

Order.belongsTo(Customer, { foreignKey: 'customer_id', targetKey: 'customer_id' });
Customer.hasMany(Order, { foreignKey: 'customer_id', sourceKey: 'customer_id' });

// OrderItem associations
OrderItem.belongsTo(MasterProduct, { foreignKey: 'prd_id', targetKey: 'prd_id' });
MasterProduct.hasMany(OrderItem, { foreignKey: 'prd_id', sourceKey: 'prd_id' });

// Sale associations
Sale.hasMany(SaleItemDetail, { foreignKey: 'sale_id', sourceKey: 'sale_id' });
SaleItemDetail.belongsTo(Sale, { foreignKey: 'sale_id', targetKey: 'sale_id' });

Sale.belongsTo(PaymentMethod, { foreignKey: 'pay_method', targetKey: 'code' });
PaymentMethod.hasMany(Sale, { foreignKey: 'pay_method', sourceKey: 'code' });

// SaleItemDetail associations
SaleItemDetail.belongsTo(MasterProduct, { foreignKey: 'prd_id', targetKey: 'prd_id' });
MasterProduct.hasMany(SaleItemDetail, { foreignKey: 'prd_id', sourceKey: 'prd_id' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  Brand,
  Category,
  Customer,
  GeneralSetting,
  MasterProduct,
  Order,
  OrderItem,
  PaymentMethod,
  Sale,
  SaleItemDetail,
  Setting,
  StoreInfor,
  Telegram,
  User
};
