require('dotenv').config()

const express = require('express')
const application = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.STRINGCONEXAO)
  .then(() => {
    application.emit('ready')
  })
  .catch(error => console.log(error))

const sessao = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const rotas = require('./routes')
const caminho = require('path')
const helmet = require('helmet')
const csurf = require('csurf')
const { globalMiddleware, anotherMiddleware, verificaErroCsrf, csrfMiddleware } = require('./src/middlewares/middleware')

application.use(helmet())
application.use(express.urlencoded({ extended: true }))
application.use(express.json())
application.use(express.static(caminho.resolve(__dirname, 'public')))

const opcoesSessao = sessao({
  secret: 'EternalSunshine123',
  store: MongoStore.create({ mongoUrl: process.env.STRINGCONEXAO }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})

application.use(opcoesSessao)
application.use(flash())

application.set('views', caminho.resolve(__dirname, 'src', 'views'))
application.set('view engine', 'ejs')

application.use(csurf())
application.use(globalMiddleware) //nossos próprios middlewares.
application.use(verificaErroCsrf)
application.use(csrfMiddleware)
application.use(anotherMiddleware)

application.use(rotas)

application.on('ready', () => {
  application.listen(3000, () => {
    console.log('http://localhost:3000')
    console.log('Servidor rodando na porta 3000')
  }
  )
})
