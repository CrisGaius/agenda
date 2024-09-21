exports.globalMiddleware = (request, response, next) => {
  next()
}

exports.verificaErroCsrf = (error, request, response, next) => {
  if (error) {
    return response.render('404')
  }
}

exports.csrfMiddleware = (request, response, next) => {
  response.locals.csrfToken = request.csrfToken()
  next()
}