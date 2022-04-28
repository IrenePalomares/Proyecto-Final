const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//motor de plantillas
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views'); 

//aplicadción para formulario 
app.use(bodyParser.urlencoded({ extended: false }));
//aplicación para json
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const user = 'trivial_registro';
const password = '7vv3WBNK0n15RXPH';
const dbname = 'Trivial';
const uri = `mongodb+srv://${user}:${password}@cluster0.kwbpr.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const mongoose = require('mongoose');
    mongoose.connect(uri, 
        {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log(e))

//monitor de plantillas
// app.set('view engine', 'ejs');

// app.set('views', __dirname + '/views')

app.use(express.static(__dirname + "/public"));


// Resireccionamiento de las rutas web

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/IniciarSesion',(req, res) => {
    res.render("iniciarSesion");
})

app.get('/Registrar',(req, res) => {
    res.render("registrar");
})

app.get('/Contacto',(req, res) => {
    res.render("contacto");
})

app.get('/Ranking',(req, res) => {
    res.render("ranking");
})
app.get('/PoisonDevils',(req, res) => {
    res.render("poisonDevils");
})
app.get('/BlackRavens',(req, res) => {
    res.render("blackRavens");
})

app.get('/Belore',(req, res) => {
    res.render("belore");
})

app.get('/CupulaGrimm',(req, res) => {
    res.render("cupulaGrimm");
})

app.get('/CeremoniaDelLirio',(req, res) => {
    res.render("ceremoniaLirio");
})

app.get('/Verdacksal',(req, res) => {
    res.render("verdacksal");
})
app.get('/Vastago',(req, res) => {
    res.render("vastago");
})

app.get('/PruebasBleidaar',(req, res) => {
    res.render("pruebas");
})

//error si el usuario intenta busacar una ruta que no se encuentra en el trivial
app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: 'Error 404 Not Found'
    })
})

app.listen(port, () => {
    console.log(`escuchando solicitudes http://localhost:${port}`);
});