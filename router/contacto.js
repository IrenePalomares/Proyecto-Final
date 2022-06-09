const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const nodemailer = require('nodemailer');

const { body, validationResult } = require('express-validator');

router.get('/',(req, res) => {
    res.render("contacto", {nombre: session.nombre, correo: session.correo});
})

router.post('/', async(req, res) => { 
    const body = req.body;

    var transporter = nodemailer.createTransport({
        host:'smtp.ethereal.email',
        port:587,
        secure:false,
        auth: {
            user:process.env.ETHEREALUSER,
            pass:process.env.ETHEREALPASS,
        }    
    })
    var mailOptions = {
            from: body.correo,
            to: process.env.CORREO,
            subject: body.asunto,
            text: body.mensaje
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error);
        } else {
            console.log('Email enviado')
            res.status(200).json(req.body)
        }
    })
    
    res.render("contacto", {nombre: session.nombre, correo: session.correo});
})

module.exports = router;
