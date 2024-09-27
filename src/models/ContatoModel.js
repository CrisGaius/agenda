const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  dataCriacao: { type: Date, default: Date.now() },
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
  constructor(body) {
    this.body = body
    this.errors = []
    this.contato = null
  }

  async criarContato() {
    this.valida()

    if (this.errors.length > 0) return

    this.contato = await ContatoModel.create(this.body)
  }

  static async buscaPeloid(id) {
    if (typeof id !== 'string') return

    const user = await ContatoModel.findById(id)
    return user
  }

  async editarContato(id) {
    if (typeof id !== 'string') return
    this.valida()
    if (this.errors.length > 0) return
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })
  }


  valida() {
    this.cleanUp()

    if (this.body.email.length === 0 || !validator.isEmail(this.body.email)) this.errors.push('Email inválido.')
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório')
    if (!this.body.email && !this.body.telefone) this.errors.push('Preencha o email ou o telefone.')
  }

  cleanUp() {
    for (const chave in this.body) {
      if (typeof this.body[chave] !== 'string') this.body[chave] = ''
    }

    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
    }
  }
}

module.exports = Contato