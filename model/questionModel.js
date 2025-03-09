const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  correct_answers: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  time_limit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  tested: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Question;
