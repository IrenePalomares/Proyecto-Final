const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    usuario: String,
    correo: String,
    contraseña: String
})

//crear modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario; 