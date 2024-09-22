const express = require('express')
const rota = express.Router()
const inicioController = require('./src/controllers/inicioController')
const loginController = require('./src/controllers/loginController')

// Rotas do inicio
rota.get('/', inicioController.index) // Initial route

// Rotas de login
rota.get('/login', loginController.index) // rota inicial do login
rota.post('/login/register', loginController.register) // rota de cadastro de usuário.
rota.post('/login/sign-in', loginController.signIn) // rota de login do usuário.
rota.get('/login/logout', loginController.logout) // rota para deslogar.

module.exports = rota