const CryptoJS = require("crypto-js");
const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
        const arrayUsuarios = await Session.find()
    res.render('iniciarSesion', {
        arrayUsuarios: arrayUsuarios,
        error:'hola'});
});

router.post('/', [
    body('usuario', 'Introduce un nombre')
        .exists()
        .isLength({min:2}),
    body('contrasena', 'Introduce una contraseña segura')
        .exists()
        .isStrongPassword()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const valores = req.body;
        const validaciones = errors.array();
        res.render('iniciarSesion', {validaciones: validaciones, valores: valores, error:'hola', mensaje:''});
    } 
    else {
        const body = req.body;
        const arrayUsuario = await Session.findOne({correo:body.usuario});
        const mensaje = {correcto: `Absoluto, acabas de acceder a nuestro Trivial ¿preparado para jugar?`, errorPassword: 'La contraseña es incorrecta Absoluto, asegúrate de que es con la que te registraste.', 
        notFound: 'Absoluto, nuestros rastreadores no encuentran tu usuario. Comprueba que lo has escrito correctamente.' }
        // console.log(arrayUsuario);
        if (!arrayUsuario) {
            res.render('iniciarSesion', { mensaje: mensaje.notFound, error: 'error' })
        } else {
                var password = CryptoJS.AES.decrypt(arrayUsuario.contrasena,process.env.KEY).toString(CryptoJS.enc.Utf8);
                var usuaroio = CryptoJS.AES.decrypt(arrayUsuario.usuario,process.env.KEY).toString(CryptoJS.enc.Utf8);
                if (body.contrasena == password){
                    res.render('eleccion', { nombre: usuaroio, mensaje: mensaje.correcto, error: 'success'})
                    res.redirect('/ElegirOpciones');
                } else {
                    res.render('iniciarSesion', { mensaje: mensaje.errorPassword, error: 'error' })
                }
        }
        res.render('iniciarSesion', {arrayUsuario: arrayUsuario, error:'hola'});
    }
});

module.exports = router;