require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true,
  },
  logging: false,
});

module.exports = sequelize;
