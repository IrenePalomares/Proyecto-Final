const express = require('express');
const router = express.Router();

const Usuario = require('../models/register');

router.get('/', async(req, res) =>{
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

router.get('/registrar', (req, res) => {
    res.render('registrar')
})

router.post('/', async(req, res) => {
    const body = req.body
    console.log(body);
})

module.exports = router;

