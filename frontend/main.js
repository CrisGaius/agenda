import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Login from './modules/Login'

const cadastro = new Login('#form__sign-in')
const login = new Login('#form__login')

cadastro.start()
login.start()

import './assets/css/style.css'