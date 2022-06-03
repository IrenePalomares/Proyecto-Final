const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const Session = require('../models/session');
const app = express();

const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
        const arrayUsuarios = await Session.find()
    res.render('iniciarSesion', {
        arrayUsuarios: arrayUsuarios,
        error:'hola',
        nombre: session.nombre});
});

router.post('/', [
    body('usuario', 'Introduce tu correo electrónico')
        .exists()
        .isLength({min:2}),
    body('contrasena', 'Introduce una contraseña segura')
        .exists()
        .isStrongPassword()
], async(req, res) => {
    const errors = validationResult(req);
    var mensaje = [];
    if(!errors.isEmpty()){
        const valores = req.body;
        const validaciones = errors.array();
        res.render('iniciarSesion', {validaciones: validaciones, valores: valores, error:'hola', mensaje:'', nombre: session.nombre});
    } 
    else {
        const body = req.body;
        const arrayUsuario = await Session.findOne({correo:body.usuario});

        if (!arrayUsuario) {
            mensaje = {errorPassword: 'La contraseña es incorrecta Absoluto, asegúrate de que es con la que te registraste.', 
            notFound: 'Absoluto, nuestros rastreadores no encuentran tu usuario. Comprueba que lo has escrito correctamente.' };
            res.render('iniciarSesion', { mensaje: mensaje.notFound, error: 'error', nombre: session.nombre });
        } else {
                var password = CryptoJS.AES.decrypt(arrayUsuario.contrasena,process.env.KEY).toString(CryptoJS.enc.Utf8);
                var usuario = CryptoJS.AES.decrypt(arrayUsuario.usuario,process.env.KEY).toString(CryptoJS.enc.Utf8);
                if (body.contrasena == password) {
                    const sesionUsuario = usuario;
                    session.nombre = sesionUsuario;
                    session.correo = arrayUsuario.correo;
                    console.log(session.nombre);
                    mensaje = { correcto: `${usuario}, acabas de acceder a nuestro Trivial ¿preparado para jugar?`};
                    res.render('eleccion', { nombre: session.nombre, mensaje: mensaje.correcto, error: 'success' });
                } else {
                    res.render('iniciarSesion', { mensaje: mensaje.errorPassword, error: 'error', nombre: session.nombre })
                }
        }
    }
});

module.exports = router;