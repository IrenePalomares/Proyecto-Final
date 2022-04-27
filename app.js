const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

app.use(express.static(__dirname + '/public'));


// app.use('/', require('./router/Rutas Web'));

app.get('/', (req, res) => {
    res.render('respuesta desde express');
})

app.get('/servicios',(req, res) => {
    res.render('Estás en la página de servicios');
})



app.listen(port, () => {
    console.log(`escuchando solicitudes http://localhost:${port}`);
});
// const server = http.createServer ((req, res) => {
//     res.end('estoy respondiendo a tu solicitud v2');
// });
// const puerto = 3001;
// server.listen(puerto, () => {
//     console.log('escuchando solicitudes');
// })