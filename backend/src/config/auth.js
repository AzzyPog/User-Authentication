const crypto = require('crypto')
const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const PRIV_KEY = fs.readFileSync(path.join(__dirname, '..', '..', 'id_rsa_priv.pem'), 'utf-8')

function generatePassword (password) {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return { salt, hash }
};

function checkPassword (password, hash, salt) {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return verifyHash === hash
};

function generateJWT (user) {
  const payload = {
    sub: user.id,
    iat: Date.now()
  }

  const jwt = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: '7d', algorithm: 'RS256' })
  return jwt
};

function decodeJWT (token) {
  const payload = token.split('.')[1]
  const encodedPayload = Buffer.from(payload, 'base64') // token codificado
  const decodedPayload = encodedPayload.toString('utf-8') // descodificando o token para utf-8

  return JSON.parse(decodedPayload)
};

function getToken (req) {
  const header = req.get('Authorization')
  if (!header) {
    throw new Error()
  };
  return header.split(' ')[1]
};

module.exports = {
  checkPassword,
  generatePassword,
  generateJWT,
  decodeJWT,
  getToken
}
