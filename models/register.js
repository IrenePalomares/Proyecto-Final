const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    usuario: String,
    correo: { type: String, unique: true},
    contrasena: String
})

//crear modelo
const Usuario = mongoose.model('Usuarios', usuarioSchema);

module.exports = Usuario; 