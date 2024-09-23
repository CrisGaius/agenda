exports.index = (request, response) => {
  response.render('contato')
}

exports.criaConta = (request, response) => {
  response.send(request.body)
}