// import ncrypt from 'ncrypt-js';
// const flash = require("connect-flash/lib/flash");
const CryptoJS = require("crypto-js");
const express = require('express');
const router = express.Router();
const Usuario = require('../models/register');
const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
    res.render("registrar", {error:'hola'});
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
        console.log(req.body);
        const valores = req.body;
        const validaciones = errors.array();
        console.log(validaciones);
        res.render('registrar', {validaciones: validaciones, valores: valores, error:'hola'});
    } 
    else {
        const body = req.body

    var user = CryptoJS.AES.encrypt(body.usuario, process.env.KEY);
    var password = CryptoJS.AES.encrypt(body.contrasena, process.env.KEY);
    var correo = CryptoJS.AES.encrypt(body.correo, process.env.KEY);

    console.log(`${user}`);
    console.log(`${password}`);
    console.log(`${correo}`);
    const final = {
        usuario: user,
        correo: correo,
        contraseña: password
    }
        try {
            const mensaje = {correcto: `Ya puedes iniciar sesión ${body.usuario} ¡Nuestros rastreadores ya tienen tu información en su base de datos!`, error: 'Las contraseñas no coinciden'}
            if (body.contrasena == body.confirmar) {
                await Usuario.create(final);
                
                res.render('iniciarSesion', {mensaje: mensaje, error: 'success'});
                res.redirect('/IniciarSesion');
            } else{
                res.render('registrar', {mensaje: mensaje, error: 'error'});
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    });

module.exports = router;

