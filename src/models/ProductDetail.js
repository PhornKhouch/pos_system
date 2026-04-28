const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const ProductDetail = sequelize.define('tbl_product_detail', {
  detail_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  prd_id: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  long_des: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  color: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  spec: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'tbl_product_detail',
  timestamps: false
});

module.exports = ProductDetail;
