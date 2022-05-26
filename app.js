const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const flash =require('connect-flash');

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

const port = process.env.PORT || 3000;

//Conexión a base de datos Trivial
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.kwbpr.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const mongoose = require('mongoose');
    mongoose.connect(uri, 
        { useNewUrlParser: true, useUnifiedTopology: true }
        )
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log(e))

//ruta estática
app.use(express.static(__dirname + "/public"));

app.use(session({
    // Se recomienda cambiar en cada entorno
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false
  }));

  if (session.nombre == null) {
    app.get("/ElegirOpciones", (req, res) => {
        // Si no se ha iniciado sesión
        res.status(404).render("404", {
            titulo: 'No tienes permiso. Inicia Sesion'
        })
    });
    app.get("/Partida", (req, res) => {
        // Si no se ha iniciado sesión
            res.status(404).render("404", {
                titulo: 'No tienes permiso. Inicia Sesion'
            })
    });                                                          
  } else if (session.nombre!='Admin') {
    console.log('hola')
    app.get("/IniciarSesion", (req, res) => {
        // Si, por ejemplo, no hay nombre
        res.status(404).render("404", {
            titulo: 'Ya has iniciado sesión no puedes volver a iniciarla'
        })  
    });
  }

  if (session.nombre!='Admin') {
    app.get("/InsertarPreguntas", (req, res) => {
        // En caso de que no sea administrador
            res.status(404).render("404", {
                titulo: 'No eres administrador, por lo tanto no puedes acceder a esta página'
            })
    });
  }
  

//Rutas Web
app.use('/', require('./router/rutasWeb'));
app.use('/Registrar', require('./router/usuarios'));
app.use('/IniciarSesion', require('./router/iniciar'));
app.use('/IniciarSesion', require('./router/usuarios'));
app.use('/Partida', require('./router/juego'));
app.use('/ElegirOpciones', require('./router/elegir'));
app.use('/InsertarPreguntas', require('./router/preguntas'));
app.use('/Ranking', require('./router/paginaranking'));


//error si el usuario intenta busacar una ruta que no se encuentra en el trivial
app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: '¿TE HAS PERDIDO? ¿Qué estabas buscando ehh?'
    })
})


app.listen(port, () => {
    console.log(`escuchando solicitudes http://localhost:${port}`);
});