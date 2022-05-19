const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
// const Preguntas = require('../models/preguntas');
const { body, validationResult } = require('express-validator');


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
    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     const valores = req.body;
    //     const validaciones = errors.array();
    //     res.render('eleccion', {validaciones: validaciones, valores: valores, error:'no hay error', nombre:'nada'})
    // }
    // else {
         const body = req.body;
         res.render('partida', {mensaje:'hola', error:'no hay error', nombre:session.nombre})
    // }
});

module.exports = router;