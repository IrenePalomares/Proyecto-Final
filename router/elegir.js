const CryptoJS = require("crypto-js");
const express = require('express');
const router = express.Router();
// const Preguntas = require('../models/preguntas');
const { body, validationResult } = require('express-validator');
const app = express();


router.get('/', async(req, res) =>{
    res.render("eleccion", 
    {error:'hola',
    nombre:'Absoluto'});
});

router.post('/',
[
    body('categorias', 'Selecciona una categoría')
        .exists()
        .custom(({ req }) => {
            if (req.body.categorias == '') {
              throw new Error('Selecciona una categoría');
            }
            return true;
          }),
    body('numero', 'Selecciona el número de preguntas que quieres que tenga tu partida')
        .exists()
        .custom(({ req }) => {
            if (req.body.numero == '') {
              throw new Error('Selecciona el número de preguntas que quieres que tenga la partida');
            }
            return true;
          })
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
         res.render('partida', {mensaje:'hola', error:'no hay error'})
    // }
});

module.exports = router;