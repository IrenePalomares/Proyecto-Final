const CryptoJS = require("crypto-js");
const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
        const arrayUsuarios = await Session.find()
        var arrayDecrypt = [];
        // console.log(arrayUsuarios)
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
        console.log(req.body);
        const valores = req.body;
        const validaciones = errors.array();
        console.log(validaciones);
        res.render('iniciarSesion', {validaciones: validaciones, valores: valores, error:'hola'});
    } 
    else {
        const arrayUsuarios = await Session.find()
        const body = req.body;
        const mensaje = {correcto: `Absoluto, acabas de acceder a nuestro Trivial, ¿preparado para jugar?`, error: 'El usuario o la contraseña son incorrectos'}
        arrayUsuarios.forEach( info => {
            var user = CryptoJS.AES.decrypt(info.usuario,process.env.KEY).toString(CryptoJS.enc.Utf8);
            var password = CryptoJS.AES.decrypt(info.contrasena,process.env.KEY).toString(CryptoJS.enc.Utf8);
            var correo = CryptoJS.AES.decrypt(info.correo,process.env.KEY).toString(CryptoJS.enc.Utf8);
            console.log(correo)
                if ((correo == body.usuario || user == body.usuario)&&(password == body.contrasena)) {
                    console.log('Se ha iniciado sesión correctamente');
                    res.render('iniciarSesion', {mensaje: mensaje, error: 'success'});
                } 
        });
        // console.log(arrayDecrypt);
        res.render('iniciarSesion', {arrayUsuarios: arrayUsuarios, error:'hola'});
    }
});

module.exports = router;