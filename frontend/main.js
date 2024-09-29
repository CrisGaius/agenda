import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Login from './modules/Login'
import Contato from './modules/Contato'

const cadastro = new Login('#form__sign-in')
const login = new Login('#form__login')
const contato = new Contato('#form__contato')

cadastro.start()
login.start()
contato.start()

import './assets/css/style.css'