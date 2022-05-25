const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const Preguntas = require('../models/questions');
const { body, validationResult } = require('express-validator');
const { Session } = require("express-session");


router.get('/', async(req, res) =>{
    res.render("eleccion", 
    {error:'hola',
    nombre: session.nombre});
});

router.post('/',
[
    body('categorias', 'Selecciona una categoría')
        .exists()
        .isLength({min:1}),
    body('numero', 'Selecciona el número de preguntas que quieres que tenga tu partida')
        .exists()
        .isLength({min:1})            
]
, async(req, res) => {
        const body = req.body;
        var arrayPreguntas = [];
        if (body.categoria !=='' && body.numero !=='') {
            switch (body.categoria) {
                case 'TC':
                    arrayPreguntas = await Preguntas.find();
                    break;
            
                default: 
                    arrayPreguntas = await Preguntas.find({Categoria:body.categoria});
                    break;
            }
            const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());
            if (arrayPreguntas.length < body.numero){
                res.render('eleccion', {mensaje:'No hay suficientes preguntas de esa categoría', error:'error', nombre:session.nombre})
            } else {
                session.preguntas = shuffleArray(arrayPreguntas);
                session.numero = body.numero;
                session.categoria = body.categoria;
                session.jugadas = 0;
                session.puntos = 0;
                session.racha = 0;
                res.render('partida', {mensaje:'hola', error:'no hay error', nombre:session.nombre, categoria:session.preguntas[session.jugadas].Categoria, preguntas: body.numero, Pregunta: session.preguntas[session.jugadas], puntuacion:session.puntos})
            }
        } 
        else {
            res.render('eleccion', {mensaje:'No has seleccionado nada', error:'error', nombre:session.nombre})
        }
});

module.exports = router;