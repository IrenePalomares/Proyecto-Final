const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const Pregunta = require('../models/Preguntas');
const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
    res.render('insertarPreguntas', {error:'hola', nombre: session.nombre});
});

router.post('/', [
    body('Pregunta', 'Inserta la pregunta')
        .exists()
        .isLength({min:1}),
    body('A', 'Introduce la respuesta A')
        .exists()
        .isLength({min:1}),
    body('B', 'Introduce la respuesta B')
        .exists()
        .isLength({min:1}),
    body('C', 'Introduce la respuesta C')
        .exists()
        .isLength({min:1}),
    body('D', 'Introduce la respuesta D')
        .exists()
        .isLength({min:1}),

], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const valores = req.body;
        const validaciones = errors.array();
        res.render('insertarPreguntas', {validaciones: validaciones, valores: valores, error:'hola', mensaje:'', nombre:session.nombre});
    } 
    else {
        const body = req.body;
        console.log(body);
        try {
            const mensaje = {correcto: `La pregunta se ha introducido correctamente`, error: 'No se ha podido insertar la pregunta en nuestra BD'}
            if (body.contrasena == body.confirmar) {
                await Pregunta.create(body);
                
                res.render('insertarPreguntas', {mensaje: mensaje.correcto, error: 'success', nombre:session.nombre});
                res.redirect('/InsertarPreguntas');
            } else{
                res.render('insertarPreguntas', {mensaje: mensaje, error: 'error', nombre:session.nombre});
            }
        } catch (error) {
            console.log(error)
        }
    }
});

module.exports = router;