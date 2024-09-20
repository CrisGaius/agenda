const express = require('express')
const rota = express.Router()
const inicioController = require('./src/controllers/inicioController')
const contactController = require('./src/controllers/contactController')

// function myMiddleware(request, response, next) {
//   request.session = { name: 'Cristiano', middleName: 'Gomes' }
//   console.log('Middleware here!')
//   next()
// }

// Rotas do inicio
rota.get('/', inicioController.initialPage) // Initial route
rota.post('/', inicioController.handleWithPost) // Handle with POST requests

// Rotas de contact
rota.get('/contact', contactController.handleWithFirstReqInContactPage)

module.exports = rota