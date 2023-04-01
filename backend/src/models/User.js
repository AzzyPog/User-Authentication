const Datatype = require('sequelize')
const sequelize = require('../config/sequelize')

const User = sequelize.define('User', {
  firstName: {
    type: Datatype.STRING,
    validate: {
      is: {
        args: ['^[a-z]+$', 'i'],
        msg: 'Seu nome só deve conter letras.'
      }
    },
    allowNull: false
  },
  lastName: {
    type: Datatype.STRING,
    validate: {
      is: {
        args: ['^[a-z]+$', 'i'],
        msg: 'Seu nome só deve conter letras.'
      }
    },
    allowNull: false
  },
  email: {
    type: Datatype.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'modelo de email inválido.'
      }
    },
    unique: true
  },
  birthDate: {
    type: Datatype.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Modelo de data inválido.'
      }
    }
  },
  hash: {
    type: Datatype.TEXT,
    allowNull: false
  },
  salt: {
    type: Datatype.TEXT,
    allowNull: false
  }
})

module.exports = User
