const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('respuesta desde express');
})

router.get('/servicios',(req, res) => {
    res.render('Estás en la página de servicios');
})

module.exports = router;