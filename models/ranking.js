const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sesionSchema = new Schema({
    nombre: String,
    puntuacion: Number,
    categoria: String,
    fecha: String,
    tiempo: String
});

//crear modelo
const ranking = mongoose.model('ranking', sesionSchema);

module.exports = ranking; 