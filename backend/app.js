require('./src/config/dotenv').configDotenv()
require('./src/config/sequelize')

const express = require('express')
const app = express()
const port = process.env.PORT
const routes = require('./src/routes/routes')
// const cors = require("cors");
// app.use(cors());

const passport = require('passport')
require('../backend/src/middleware/jwtPassport')(passport)
app.use(passport.initialize())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
