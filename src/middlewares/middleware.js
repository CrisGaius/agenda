exports.globalMiddleware = (request, response, next) => {
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