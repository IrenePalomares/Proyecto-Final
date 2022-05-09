const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sesionSchema = new Schema({
    Pregunta: String,
    A: String,
    B: String, 
    C: String, 
    D: String, 
    Correcta: String, 
    Categoría: String, 
})

//crear modelo
const Sesion = mongoose.model('usuarios', sesionSchema);

module.exports = Sesion; 