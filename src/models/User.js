const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const User = sequelize.define('tbl_user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(6),
    allowNull: false
  }
}, {
  tableName: 'tbl_user',
  timestamps: false
});

module.exports = User;
