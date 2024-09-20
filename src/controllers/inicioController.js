// const InicioModel = require('../models/InicioModel')

// InicioModel.create({
//   title: 'Friends',
//   description: 'Love Chandler Forever.'
// })
//   .then(data => console.log(data))
//   .catch(error => console.log(error))

// InicioModel.find()
//   .then(data => console.log(data))
//   .catch(error => console.log(error))

exports.initialPage = (request, response) => {
  // console.log('Respondendo o cliente')
  // request.session.user = { name: 'Cristiano', signed: true }
  // console.log(request.session.user)
  // request.flash('info', 'Hello, world!')
  // request.flash('error', 'Erro!')
  // request.flash('success', 'Great job!')
  // console.log(request.flash('error'), request.flash('success'), request.flash('info'))

  response.render('index', {
    title: 'Title of the page :>',
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  })
  // console.log(`Home:${request.session.name}`)
  // next()
}

exports.handleWithPost = (request, response) => {
  response.send(request.body)
}