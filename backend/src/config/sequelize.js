const { Sequelize } = require('sequelize')
require('./dotenv').configDotenv()

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_DATABASE
})
module.exports = sequelize

require('../models/User')
