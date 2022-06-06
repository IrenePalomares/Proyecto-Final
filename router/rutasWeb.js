// const { LongWithoutOverridesClass } = require('bson');
const express = require('express');
const session = require('express-session');
const router = express.Router();
const app = express();
// const swal = require('sweetalert2');

app.use('/Registrar', require('../router/usuarios'));
app.use('/IniciarSesion', require('../router/iniciar'));
app.use('/IniciarSesion', require('../router/usuarios'));
app.use('/Partida', require('../router/juego'));
app.use('/ElegirOpciones', require('../router/elegir'));
app.use('/InsertarPreguntas', require('../router/preguntas'));
app.use('/Ranking', require('../router/paginaranking'));
// app.use('/ComprobarCorreo', require('../router/comprobarCorreo'))
// app.use('/CambiarContrasenia', require('../router/cambiarContrasenia'))

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
        session.nombre = undefined;
        res.redirect('/');
})
// router.get('/FinalizarPartida',(req, res, next) => {
//     swal({
//         title: "Estás seguro de que quieres terminar?",
//         text: `${session.nombre} no se va a guardar la puntuación!`,
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//       }).then((willDelete) => {
//         if (willDelete) {
//           swal("Ya has finalizado la partida, te redirigiremos a la página de inicio", {
//             icon: "success",
//           });
//           res.redirect('/');
//         } else {
//           swal(`Uf ${session.nombre}, por los pelos... Puedes seguir jugando!`);
//         }
//       });
// })


module.exports = router;