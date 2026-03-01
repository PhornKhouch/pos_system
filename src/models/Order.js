const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Order = sequelize.define('tbl_order', {
  order_id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fullname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  adress: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  postalcode: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  customer_id: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  status_payment: {
    type: DataTypes.ENUM('ABA', 'Aceleda', 'Wing'),
    allowNull: true
  },
  created_by: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  created_on: {
    type: DataTypes.DATE,
    allowNull: true
  },
  changed_by: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  changed_on: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'tbl_order',
  timestamps: false
});

module.exports = Order;
