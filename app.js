const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//monitor de plantillas
// app.set('view engine', 'ejs');

// app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/HTML'));
app.use(express.static(__dirname + '/CSS'));
app.use(express.static(__dirname + '/IMG'));

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