const validator = require('validator')

export default class Login {
  constructor(classeForm) {
    this.formulario = document.querySelector(classeForm)
  }

  start() {
    this.eventos()
  }

  eventos() {
    if (!this.formulario) return

    this.formulario.addEventListener('submit', (e) => {
      e.preventDefault()
      this.validarCampos(e)
    })
  }

  validarCampos(e) {
    const el = e.target
    const inputEmail = el.querySelector('input#email')
    const inputSenha = el.querySelector('input#senha')
    let error = false;

    for (let erro of this.formulario.querySelectorAll('span.text-danger')) {
      erro.remove()
    }

    if (!validator.isEmail(inputEmail.value)) {
      this.criaErro(inputEmail, 'Email inválido.')
      error = true
    }

    if (inputSenha.value.length < 3 || inputSenha.value.length > 50) {
      this.criaErro(inputSenha, 'Senha inválida.')
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