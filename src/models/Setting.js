const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Setting = sequelize.define('tbl_setting', {
  setting_code: {
    type: DataTypes.STRING(25),
    primaryKey: true,
    allowNull: false
  },
  setting_type: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  des: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'tbl_setting',
  timestamps: false
});

module.exports = Setting;
