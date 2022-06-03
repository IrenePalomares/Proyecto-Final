const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const Session = require('../models/session');
const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
    res.render('cambiarContraseña2', 
    {error:'hola',
    nombre: session.nombre, mensaje: 'El Paladín está en funcionamiento'});
});

router.post('/', async(req, res) => {
    const body = req.body;
    const arrayUsuario = await Session.findOne({correo: session.correo});
    var mensaje = '';
    if (!arrayUsuario) {
        mensaje = 'Absoluto, nuestros rastreadores no encuentran tu usuario. Comprueba que lo has escrito correctamente.';
        res.render('cambiarContraseña2', { mensaje: mensaje, error: 'error', nombre: session.nombre });
    } else {
        if (body.contrasena === body.confirmar) {
            mensaje = `Tu contraseña se ha cambiado correctamente, si no te fias de este mensaje pregúntale a Cora o Vanesa ;)`;
            var password = CryptoJS.AES.encrypt(body.contrasena, process.env.KEY);
            const id = arrayUsuario.id;
            const final = {
                usuario: arrayUsuario.usuario,
                correo: arrayUsuario.correo,
                contrasena: password
            }
            try {
                const modificarUsuario = await Session.findByIdAndUpdate(
                    { _id: id }, { usuario: arrayUsuario.usuario, correo: arrayUsuario.correo, contrasena: password }
                )
            } catch (error) {
                console.log(error);
            }
            
            res.render('iniciarSesion', { mensaje: mensaje, error:'success', nombre: session.nombre });
        } else {
            mensaje = `Las contraseñas no coinciden Absoluto, prueba a ponerlas de nuevo`;
            res.render('cambiarContraseña2', { mensaje: mensaje, error:'error', nombre: session.nombre });
        }
    }
});

module.exports = router;