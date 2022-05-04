const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sesionSchema = new Schema({
    usuario: String,
    correo: String,
    contrasena: String
})

//crear modelo
const Sesion = mongoose.model('usuarios', sesionSchema);

module.exports = Sesion; 