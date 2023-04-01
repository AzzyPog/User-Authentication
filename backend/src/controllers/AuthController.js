const User = require('../models/User')
const Auth = require('../config/auth')

async function login (req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' })

    const { password } = req.body

    if (Auth.checkPassword(password, user.hash, user.salt)) {
      const token = Auth.generateJWT(user)
      return res.status(200).json({ token })
    } else return res.status(401).json({ messsage: 'Senha inválida.' })
  } catch (error) {
    return res.status(500).json(error + '!')
  }
};

async function getDetails (req, res) {
  try {
    const token = Auth.getToken(req)
    const payload = Auth.decodeJWT(token)
    const user = await User.findByPk(payload.sub)

    if (!user) return res.status(404).json({ message: 'Usuário não econtrado.' })

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json(error + '!')
  }
}

module.exports = {
  login,
  getDetails
}
