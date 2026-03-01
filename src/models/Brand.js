const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Brand = sequelize.define('tbl_brand', {
  code: {
    type: DataTypes.STRING(100),
    primaryKey: true,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  category_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  remark: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  photo: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'tbl_brand',
  timestamps: false
});

module.exports = Brand;
