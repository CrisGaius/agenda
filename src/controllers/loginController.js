const Login = require('../models/LoginModel')

exports.index = (request, response) => {
  response.render('login')
}

exports.register = async (request, response) => {
  const login = new Login(request.body)
  try {
    await login.register()

    if (login.errors.length > 0) {
      request.flash('errors', login.errors)
      request.session.save(() => {
        response.redirect('../views/login.ejs')
      })
      return
    }

    response.send(login.errors)
  } catch (e) {
    console.error(e)
  }
}