require('dotenv').config();
const { Sequelize } = require('sequelize');
//production database configuration

// const sequelize = new Sequelize(
//   process.env.DATABASE_URL || 'mysql://root:IYgNjWfQnleWHZdUbxMbvYHaFypReXRU@mysql.railway.internal:3306/railway',
//   {
//     dialect: 'mysql'
//   }
// );

// Old localhost connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'backend_pos_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql'
  }
);

module.exports = sequelize;