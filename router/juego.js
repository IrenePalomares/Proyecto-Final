const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const Preguntas = require('../models/questions');
const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
    res.render("partida", {error:'hola', nombre:session.nombre});
});

// router.post('/', [
//     body('usuario', 'Introduce un nombre')
//         .exists()
//         .isLength({min:2}),
//     body('contrasena', 'Introduce una contraseña segura')
//         .exists()
//         .isStrongPassword()
// ], async(req, res) => {
    
// });

module.exports = router;