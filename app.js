const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const flash =require('connect-flash');

const app = express();


//aplicadción para recoger información formulario 
app.use(bodyParser.urlencoded({ extended: false }));
//aplicación para información json
app.use(bodyParser.json());

require('dotenv').config();

//motor de plantillas
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views'); 



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

//Rutas Web
app.use('/', require('./router/rutasWeb'))
app.use('/Registrar', require('./router/usuarios'))
app.use('/IniciarSesion', require('./router/usuarios'))

//error si el usuario intenta busacar una ruta que no se encuentra en el trivial
app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: 'Error 404 Not Found'
    })
})


app.listen(port, () => {
    console.log(`escuchando solicitudes http://localhost:${port}`);
});