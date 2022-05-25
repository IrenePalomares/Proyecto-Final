// const { LongWithoutOverridesClass } = require('bson');
const express = require('express');
const session = require('express-session');
const router = express.Router();
const app = express();

app.use('/Registrar', require('../router/usuarios'));
app.use('/IniciarSesion', require('../router/iniciar'));
app.use('/IniciarSesion', require('../router/usuarios'));
app.use('/Partida', require('../router/juego'));
app.use('/ElegirOpciones', require('../router/elegir'));
app.use('/InsertarPreguntas', require('../router/preguntas'));
app.use('/Ranking', require('../router/paginaranking'));

// Redireccionamiento de las rutas web

router.get('/', (req, res) => {
    res.render("index", {nombre: session.nombre});
})

router.get('/Contacto',(req, res) => {
    res.render("contacto", {nombre: session.nombre});
})

router.get('/PoisonDevils',(req, res) => {
    res.render("poisonDevils", {nombre: session.nombre});
})

router.get('/BlackRavens',(req, res) => {
    res.render("blackRavens", {nombre: session.nombre});
})

router.get('/Belore',(req, res) => {
    res.render("belore", {nombre: session.nombre});
})

router.get('/CupulaGrimm',(req, res) => {
    res.render("cupulaGrimm", {nombre: session.nombre});
})

router.get('/CeremoniaDelLirio',(req, res) => {
    res.render("ceremoniaLirio", {nombre: session.nombre});
})

router.get('/Verdacksal',(req, res) => {
    res.render("verdacksal", {nombre: session.nombre});
})

router.get('/Vastago',(req, res) => {
    res.render("vastago", {nombre: session.nombre});
})

router.get('/PruebasBleidaar',(req, res) => {
    res.render("pruebas", {nombre: session.nombre});
})
router.get('/CerrarSesion',(req, res, next) => {
        // req.session.destroy();
        session.nombre=null;
        res.redirect('/');
})


module.exports = router;