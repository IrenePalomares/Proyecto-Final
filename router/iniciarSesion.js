const CryptoJS = require("crypto-js");
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
    res.render("iniciarSesion", {error:'hola'});
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
        const body = req.body

    var user = CryptoJS.AES.decrypt(process.env.KEY).toString(CryptoJS.enc.Utf8);
    var password = CryptoJS.AES.decrypt(process.env.KEY).toString(CryptoJS.enc.Utf8);
    var correo = CryptoJS.AES.decrypt(process.env.KEY).toString(CryptoJS.enc.Utf8);

    console.log(`${user}`);
    console.log(`${password}`);
    console.log(`${correo}`);
    
    }
});

module.exports = router;