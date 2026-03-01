const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Category = sequelize.define('tbl_category', {
  code: {
    type: DataTypes.STRING(100),
    primaryKey: true,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  remark: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'tbl_category',
  timestamps: false
});

module.exports = Category;
