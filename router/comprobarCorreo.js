const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const Session = require('../models/session');
const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
    res.render('cambiarContraseña1', 
    {error:'hola',
    nombre: session.nombre, 
    mensaje: 'El Paladín está en funcionamiento'});
});

router.post('/', async(req, res) => {
    const body = req.body;
    const arrayUsuario = await Session.findOne({correo:body.usuario});
    var mensaje = '';
    session.correo = arrayUsuario.correo;
    if (!arrayUsuario) {
        mensaje = 'Absoluto, nuestros rastreadores no encuentran tu usuario. Comprueba que lo has escrito correctamente.';
        res.render('cambiarContraseña1', { mensaje: mensaje, error: 'error', nombre: session.nombre });
    } else {
        mensaje = `Genial Absoluto, si este es tu correo ${arrayUsuario.correo} a continuacíon podrás cambiar la contraseña de tu usuario. Felipe se encargará de el resto ;)`;
        res.render('cambiarContraseña2', { mensaje: mensaje, error:'success', correo: session.correo, nombre: session.nombre});
    }
});

module.exports = router;