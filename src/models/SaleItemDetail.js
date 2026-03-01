const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const SaleItemDetail = sequelize.define('tbl_sale_item_detail', {
  std_id: {
    type: DataTypes.STRING(25),
    primaryKey: true,
    allowNull: false
  },
  sale_id: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  prd_id: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  create_by: {
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
  tableName: 'tbl_sale_item_detail',
  timestamps: false
});

module.exports = SaleItemDetail;
