const validator = require('validator')

export default class Contato {
  constructor(classeForm) {
    this.formulario = document.querySelector(classeForm)
  }

  start() {
    this.eventos()
  }

  eventos() {
    if (!this.formulario) return

    this.formulario.addEventListener('submit', e => {
      e.preventDefault()
      this.validaCampos(e)
    })
  }

  validaCampos(e) {
    const el = e.target
    const inputNome = el.querySelector('input#nome')
    const inputEmail = el.querySelector('input#email')
    const inputTelefone = el.querySelector('input#telefone')
    let error = false

    for (let erro of this.formulario.querySelectorAll('span.text-danger')) {
      erro.remove()
    }

    if (!inputNome.value) {
      this.criaErro(inputNome, 'Nome é um campo obrigatório.')
      error = true
    }

    if (inputEmail.value.length === 0 || !validator.isEmail(inputEmail.value)) {
      this.criaErro(inputEmail, 'Email inválido.')
      error = true
    }

    if (!inputTelefone.value) {
      this.criaErro(inputTelefone, 'Telefone é um campo obrigatório.')
      error = true
    }

    if (!error) el.submit()
  }

  criaErro(campo, mensagem) {
    const spanErro = document.createElement('span')
    spanErro.innerText = mensagem
    spanErro.classList.add('text-danger')
    campo.insertAdjacentElement('afterend', spanErro)
  }
}