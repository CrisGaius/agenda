const Contato = require('../models/ContatoModel')

exports.index = (request, response) => {
  response.render('contato', {
    contato: {}
  })
}

exports.criarContato = async (request, response) => {
  try {
    const contato = new Contato(request.body)
    await contato.criarContato()

    if (contato.errors.length > 0) {
      request.flash('errors', contato.errors)
      request.session.save(() => response.redirect('/contato'))
      return
    }

    request.flash('success', 'Contato registrado com sucesso.')
    request.session.save(() => response.redirect(`/contato/${contato.contato._id}`))
    return
  } catch (e) {
    return response.render('404')
  }
}

exports.buscaContato = async function (request, response) {
  if (!request.params.id) return response.render('404')

  const contato = await Contato.buscaPeloid(request.params.id)

  if (!contato) return response.render('404')

  response.render('contato', { contato })
}