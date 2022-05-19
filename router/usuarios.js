const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const Usuario = require('../models/register');
const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
    res.render("registrar", {error:'hola', nombre: session.nombre});
});

router.post('/', [
    body('usuario', 'Introduce un nombre')
        .exists()
        .isLength({min:2}),
    body('correo', 'Introduce un correo válido')
        .exists()
        .isEmail(),
    body('contrasena', 'Introduce una contraseña segura')
        .exists()
        .isStrongPassword()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // console.log(req.body);
        const valores = req.body;
        const validaciones = errors.array();
        // console.log(validaciones);
        res.render('registrar', {validaciones: validaciones, valores: valores, error:'hola', nombre: session.nombre});
    } 
    else {
        const body = req.body
    var user = CryptoJS.AES.encrypt(body.usuario, process.env.KEY);
    var password = CryptoJS.AES.encrypt(body.contrasena, process.env.KEY);
    var correo = body.correo;

    const final = {
        usuario: user,
        correo: correo,
        contrasena: password
    }
        try {
            const mensaje = {correcto: `Ya puedes iniciar sesión ${body.usuario} ¡Nuestros rastreadores ya tienen tu información en su base de datos!`, error: 'Las contraseñas no coinciden'}
            if (body.contrasena == body.confirmar) {
                await Usuario.create(final);
                
                res.render('iniciarSesion', {mensaje: mensaje.correcto, error: 'success', nombre: session.nombre});
                res.redirect('/IniciarSesion');
            } else{
                res.render('registrar', {mensaje: mensaje, error: 'error', nombre: session.nombre});
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    });

module.exports = router;

