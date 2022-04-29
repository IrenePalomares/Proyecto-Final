// import ncrypt from 'ncrypt-js';
const CryptoJS = require("crypto-js");
const express = require('express');
const router = express.Router();

const Usuario = require('../models/register');

router.get('/Registrar', async(req, res) =>{
    try {
        const arrayUsuariosDB = await Usuario.find();
        console.log(arrayUsuariosDB);

        res.render("usuarios", {
            arrayUsuariosDB:arrayUsuariosDB
        })

    } catch (error) {
        console.log(error);
    }
})

router.get('/Registrar', (req, res) => {
    res.render('registrar')
})

router.post('/', async(req, res) => {
    const body = req.body
   
    // console.log(body)
    var user = CryptoJS.AES.encrypt(body.usuario, process.env.KEY);
    var password = CryptoJS.AES.encrypt(body.contraseña, process.env.KEY);
    var correo = CryptoJS.AES.encrypt(body.correo, process.env.KEY);
    console.log(`${user}`);
    console.log(`${password}`);
    console.log(`${correo}`);
    const final = {
        usuario: user,
        correo: password,
        contraseña: correo
    }
    try {
        const usuarioDB = new Usuario(final)
        await usuarioDB.save()

        console.log(usuarioDB)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;

