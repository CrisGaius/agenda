exports.initialPage = (request, response) => {
  response.render('index', {
    title: 'Title of the page :>',
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  })
}

exports.handleWithPost = (request, response) => {
  response.send(request.body)
}