const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const Usuario = require('../models/register');
var Mailchimp = require('mailchimp-api-v3');
const request = require("request");
const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
    if (!session.nombre  || session.nombre === 'Admin') {
        res.render("registrar", {error:'hola', nombre: session.nombre});
    }
    else {
        res.status(403).render('403', {
            titulo: 'Ya tienes un usuario Absoluto, no puedes volver a registrarte. No te pases de listillo ;)',
            nombre:session.nombre
        })
    }
});

router.post('/', [
    body('usuario', 'Introduce un nombre')
        .exists()
        .isLength({min:2}),
    body('correo', 'Introduce un correo válido')
        .exists()
        .isEmail(),
    body('contrasena', 'La contraseña debe contener: mínimo 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial')
        .exists()
        .isStrongPassword()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const valores = req.body;
        const validaciones = errors.array();
        res.render('registrar', {validaciones: validaciones, valores: valores, error:'hola', nombre: session.nombre});
    } 
    else {
        const body = req.body
        var user = CryptoJS.AES.encrypt(body.usuario, process.env.KEY);
        var password = CryptoJS.AES.encrypt(body.contrasena, process.env.KEY);
        var correo = body.correo;
        const arrayUsuario = await Usuario.findOne({ correo:correo });
        const final = {
            usuario: user.toString(),
            correo: correo,
            contrasena: password.toString()
        }
        if (!arrayUsuario) {
            const addData = {
                members: [
                    {
                    email_address: correo,
                    status: 'pending'
                    }
                ]
            }
            addDataJson = JSON.stringify(addData);
            const options = {
                url: `https://us14.api.mailchimp.com/3.0/lists/${process.env.AUDIENCEID}`,
                method: 'POST',
                headers: {
                Authorization: `auth ${process.env.APIKEY}`
                },
                body: addDataJson
            }
            request (options, (error, response, body) => {
                if(error) {
                res.json({error}) 
                } else {
                    res.status(200);
                }
            })
            try {
                const mensaje = {correcto: `Ya puedes iniciar sesión ${body.usuario} ¡Nuestros rastreadores ya tienen tu información en su base de datos!`}
                if (body.contrasena == body.confirmar) {
                    await Usuario.create(final);
                    
                    res.render('iniciarSesion', {mensaje: mensaje.correcto, error: 'success', nombre: session.nombre, correo: session.correo});
                } else{
                    res.render('registrar', {mensaje: 'Las contraseñas no coinciden', error: 'error', nombre: session.nombre});
                }
                
            } catch (error) {
                console.log(error)
            }
        } else {
            res.render('registrar', {mensaje: 'Este usuario ya está registrado', error: 'error', nombre: session.nombre});
        }
    }
});

module.exports = router;

