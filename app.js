const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

//aplicadción para recoger información formulario 
app.use(bodyParser.urlencoded({ extended: false }));
//aplicación para información json
app.use(bodyParser.json());

require('dotenv').config();

//motor de plantillas
app.set('views',__dirname + '/views'); 
app.set('view engine', 'ejs');

app.use(cookieParser());

//Conexión a base de datos Trivial
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.kwbpr.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const mongoose = require('mongoose');
    mongoose.connect(uri, 
        { useNewUrlParser: true, useUnifiedTopology: true }
        )
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log(e))

const port = process.env.PORT || 3000;

//ruta estática
app.use(express.static(__dirname + "/public"));

app.use(session({
    // Se recomienda cambiar en cada entorno
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false
  }));

//Rutas Web
app.use('/', require('./router/rutasWeb'));
app.use('/Registrar', require('./router/usuarios'));
app.use('/IniciarSesion', require('./router/iniciar'));
app.use('/IniciarSesion', require('./router/usuarios'));
app.use('/Partida', require('./router/juego'));
app.use('/ElegirOpciones', require('./router/elegir'));
app.use('/InsertarPreguntas', require('./router/preguntas'));
app.use('/Ranking', require('./router/paginaranking'));
app.use('/ComprobarCorreo', require('./router/comprobarCorreo'));
app.use('/CambiarContrasenia', require('./router/cambiarContrasenia'));
app.use('/Contacto', require('./router/contacto'));


//error si el usuario intenta busacar una ruta que no se encuentra en el trivial
app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: '¿TE HAS PERDIDO? ¿Qué estabas buscando ehh?', nombre: session.nombre
    })
})

app.use((req, res, next) => {
    res.status(403).render('403', {
        nombre:session.nombre
    })
})

app.listen(port, () => {
    console.log(`escuchando solicitudes http://localhost:${port}`);
});
