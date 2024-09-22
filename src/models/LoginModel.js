const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true },
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
  constructor(body) {
    this.body = body
    this.errors = []
    this.user = null
  }

  async signIn() {
    this.valida()
    if (this.errors.length > 0) return

    this.user = await LoginModel.findOne({ email: this.body.email })

    if (!this.user) return this.errors.push('Usuário não encontrado.')

    if (!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
      this.user = null
      return this.errors.push('Senha Inválida')
    }
  }

  async register() {
    this.valida()
    if (this.errors.length > 0) return

    await this.usuarioJaExiste()

    if (this.errors.length > 0) return

    const salt = bcryptjs.genSaltSync()
    this.body.senha = bcryptjs.hashSync(this.body.senha, salt)
    this.user = await LoginModel.create(this.body)
  }

  async usuarioJaExiste() {
    const user = await LoginModel.findOne({ email: this.body.email })
    if (user) this.errors.push('Já existe alguém utilizando este email.')
  }

  valida() {
    this.cleanUp()

    if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido.')
    if (this.body.senha.length < 3 || this.body.senha.length > 50) this.errors.push('A senha precisa ter entre 3 e 50 caracteres.')
  }

  cleanUp() {
    for (const chave in this.body) {
      if (typeof this.body[chave] !== 'string') this.body[chave] = ''
    }

    this.body = {
      email: this.body.email,
      senha: this.body.senha
    }
  }
}

module.exports = Login