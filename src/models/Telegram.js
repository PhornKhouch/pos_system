const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Telegram = sequelize.define('tbl_telegram', {
  tel_id: {
    type: DataTypes.STRING(25),
    primaryKey: true,
    allowNull: false
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  group_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  is_alert: {
    type: DataTypes.ENUM('0', '1'),
    allowNull: true
  }
}, {
  tableName: 'tbl_telegram',
  timestamps: false
});

module.exports = Telegram;
