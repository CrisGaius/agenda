exports.globalMiddleware = (request, response, next) => {
  // console.log('Cheguei aqui!!')

  // if (request.body.name) {
  //   request.body.name = request.body.name.replace('cristiano', 'Júlia')
  //   console.log(`HELLO ${request.body.name}`)
  // }
  response.locals.localVariable = 'This is a local variable.'
  next()
}

exports.verificaErroCsrf = (error, request, response, next) => {
  if (error && error.code === 'EBADCSRFTOKEN') {
    return response.render('404')
  }
}

exports.csrfMiddleware = (request, response, next) => {
  response.locals.csrfToken = request.csrfToken()
  next()
}

exports.anotherMiddleware = (request, response, next) => {
  // console.log('Sou outro middleware!')

  next()
}