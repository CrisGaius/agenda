const Contato = require('../models/ContatoModel')

exports.index = async (request, response) => {
  try {
    const contatos = await Contato.buscaContatos()
    response.render('index', { contatos })
  } catch (e) {
    console.log(e)
    response.render('404')
  }
}