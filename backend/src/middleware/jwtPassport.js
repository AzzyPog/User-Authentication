const fs = require('fs')
const path = require('path')
const User = require('../models/User')

const PUB_KEY = fs.readFileSync(path.join(__dirname, '../../', 'id_rsa_pub.pem'), 'utf-8')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
}

module.exports = (passport) => {
  passport.use(new JwtStrategy(option, async (payload, done) => {
    await User.findByPk(payload.sub).then((user) => {
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    }).catch(err => done(err, null))
  }))
}
