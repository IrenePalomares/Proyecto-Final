const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const Session = require('../models/session');
const mongoose = require('mongoose')
const app = express();

const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
    /*Condición si la sesión del nombre es undefined o la sesión contiene el usuario Administrador,
    muestra la página de inicio de sesión*/
    if (!session.nombre || session.nombre === 'Admin') {
            const arrayUsuarios = await Session.find()

            res.render('iniciarSesion', {
                arrayUsuarios: arrayUsuarios,
                error:'hola',
                nombre: session.nombre,
                correo: session.correo});
    } else {
        //Error 403 cuando el usuario ya ha iniciado sesión, por lo tanto no podrá iniciar sesión de nuevo.
        res.status(403).render('403', {
            titulo: 'Ya has iniciado sesión no puedes volver a iniciarla',
            nombre:session.nombre,
            correo: session.correo
        })
    }
});

router.post('/', [
    body('usuario', 'Introduce tu correo electrónico')
        .exists()
        .isLength({min:2})
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
            mensaje = { 
            notFound: 'Absoluto, nuestros rastreadores no encuentran tu usuario. Comprueba que lo has escrito correctamente.' };
            res.render('iniciarSesion', { mensaje: mensaje.notFound, error: 'error', nombre: session.nombre });
        } else {
                var password = CryptoJS.AES.decrypt(arrayUsuario.contrasena,process.env.KEY).toString(CryptoJS.enc.Utf8);
                var usuario = CryptoJS.AES.decrypt(arrayUsuario.usuario,process.env.KEY).toString(CryptoJS.enc.Utf8);
                if (body.contrasena == password) {
                    const sesionUsuario = usuario;
                    session.nombre = sesionUsuario;
                    session.correo = arrayUsuario.correo;
                    mensaje = { correcto: `${usuario}, acabas de acceder a nuestro Trivial ¿preparado para jugar?`};
                    res.render('eleccion', { nombre: session.nombre, mensaje: mensaje.correcto, error: 'success' });
                } else {
                    res.render('iniciarSesion', { mensaje: 'La contraseña es incorrecta Absoluto, asegúrate de que es con la que te registraste.', error: 'error', nombre: session.nombre, correo:body.usuario })
                }
        }
        
    }
});

module.exports = router;