const Login = require('../models/LoginModel')

exports.index = (request, response) => {
  response.render('login')
}

exports.register = async (request, response) => {
  try {
    const login = new Login(request.body)

    await login.register()

    if (login.errors.length > 0) {
      request.flash('errors', login.errors)
      request.session.save(() => {
        response.redirect('/login')
      })
      return
    }

    request.flash('success', 'Usuário criado com sucesso.')
    request.session.save(() => {
      return response.redirect('/login')
    })
  } catch (e) {
    console.error(e)
    return response.render('404')
  }
}