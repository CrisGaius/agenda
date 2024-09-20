const express = require('express')
const rota = express.Router()
const inicioController = require('./src/controllers/inicioController')
const contactController = require('./src/controllers/contactController')

// Rotas do inicio
rota.get('/', inicioController.initialPage) // Initial route

module.exports = rota