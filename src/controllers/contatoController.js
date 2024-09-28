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

exports.editarContato = async function (request, response) {
  if (!request.params.id) return response.render('404')

  try {
    const contato = new Contato(request.body)
    await contato.editarContato(request.params.id)

    if (contato.errors.length > 0) {
      request.flash('errors', contato.errors)
      request.session.save(() => response.redirect(`/contato/${request.params.id}`))
      return
    }

    request.flash('success', 'Contato modificado com sucesso.')
    request.session.save(() => response.redirect(`/contato/${contato.contato._id}`))
    return
  } catch (e) {
    console.log(e)
    response.render('404')
  }
}

exports.deletarContato = async function (request, response) {
  if (!request.params.id) return response.render('404')

  const contato = await Contato.deletarContato(request.params.id)
  if (!contato) return response.render('404')

  request.flash('success', 'Contato excluído com sucesso.')
  request.session.save(() => response.redirect('/'))
  return
}