const mongoose = require('mongoose')

const InicioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String
})

const InicioModel = mongoose.model('Inicio', InicioSchema)

// module.exports = InicioModel

class Inicio {

}

module.exports = Inicio