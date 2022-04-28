const express = require('express');
const router = express.Router();

// Resireccionamiento de las rutas web

router.get('/', (req, res) => {
    res.render("index");
})

router.get('/IniciarSesion',(req, res) => {
    res.render("iniciarSesion");
})

router.get('/Registrar',(req, res) => {
    res.render("registrar");
})

router.get('/Contacto',(req, res) => {
    res.render("contacto");
})

router.get('/Ranking',(req, res) => {
    res.render("ranking");
})
router.get('/PoisonDevils',(req, res) => {
    res.render("poisonDevils");
})
router.get('/BlackRavens',(req, res) => {
    res.render("blackRavens");
})

router.get('/Belore',(req, res) => {
    res.render("belore");
})

router.get('/CupulaGrimm',(req, res) => {
    res.render("cupulaGrimm");
})

router.get('/CeremoniaDelLirio',(req, res) => {
    res.render("ceremoniaLirio");
})

router.get('/Verdacksal',(req, res) => {
    res.render("verdacksal");
})
router.get('/Vastago',(req, res) => {
    res.render("vastago");
})

router.get('/PruebasBleidaar',(req, res) => {
    res.render("pruebas");
})

module.exports = router;