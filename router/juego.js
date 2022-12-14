const CryptoJS = require("crypto-js");
const express = require('express');
const session = require('express-session');
const router = express.Router();
const Preguntas = require('../models/questions');
const Ranking = require('../models/ranking');
const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) =>{
    if (!session.nombre) {
        //Error 403 que le salta al usuario en caso de que no haya iniciado sesión
        res.status(403).render('403', {
            titulo: 'No tienes permiso. Inicia Sesion',
            nombre:session.nombre
        })
    } else if (!session.categoria || !session.numero) {
        /*En cambio este Error 403 le salta al usuario en caso de que no haya hecho la selección de la categoría y las preguntas para 
        jugar el trivial */
        res.status(403).render('403', {
            titulo: 'Antes de jugar tienes que seleccionar la categoría y el número de preguntas que tendrá la partida',
            nombre:session.nombre
        })
    } else {
        session.preguntas = [];
        session.jugadas = 0;
        session.numero = 0;
        session.puntos = session.puntos + 200;
        res.render('partida', {mensaje:'hola', error:'no hay error', nombre:'Absoluto', categoria:session.preguntas[session.jugadas].Categoria, preguntas: body.numero, Pregunta: session.preguntas[session.jugadas], puntuacion:session.puntos, tiempo:'0:00'})
    }
});

router.post('/', [
    
], async(req, res) => {
    const body = req.body;
    
    if (session.jugadas < session.numero-1){
        var correcta = '';
        if (session.jugadas===0) {
            correcta = session.preguntas[session.jugadas].Correcta;
        } else {
            correcta = session.preguntas[session.jugadas].Correcta
        }
        session.jugadas ++;
        if ((body.respuesta === correcta)) {
            session.racha ++;
            session.puntos = session.puntos + (200 * session.racha);
            var mensaje = `Muy bien ${session.nombre}! Has hacertado la pregunta`;
            res.render("partida", {error:'success', mensaje:mensaje, nombre: session.nombre, Pregunta: session.preguntas[session.jugadas], categoria: session.preguntas[session.jugadas].Categoria, puntuacion: session.puntos});
        } else {
            session.racha = 0;
            var mensaje = `Vaya ${session.nombre}... Parece que hay que hay que releer los libros`;
            res.render("partida", {error:'error', mensaje:mensaje, nombre: session.nombre, Pregunta: session.preguntas[session.jugadas], categoria: session.preguntas[session.jugadas].Categoria, puntuacion: session.puntos});
        }
        
    } else {
        var mensaje = '';
        if (session.puntos<10000) {
            mensaje = `${session.nombre} has terminado la partida con ${session.puntos} puntos! Enhorabuena Absoluto!`;
        } else if (session.puntos >= 1000 && session.puntos < 5000) {
            mensaje = `${session.nombre} has terminado la partida con ${session.puntos} puntos! Al parecer sabes bastante de nuestro Secreto!`;
        } else if (session.puntos >= 5000 && session.puntos < 10000) {
            mensaje = `${session.nombre} has terminado la partida con ${session.puntos} puntos! Haz más memoria Absoluto estás cerca de rozar la perfección!`;
        } else if (session.puntos >= 10000 && session.puntos < 30000) {
            mensaje = `${session.nombre} has terminado la partida con ${session.puntos} puntos! Estás cerca de la excelencia, uno de nuestros mejores jugadores sin duda!`;
        } else if (session.puntos >= 30000) {
            mensaje = `${session.nombre} has terminado la partida con ${session.puntos} puntos! Sin duda te podrías sacar un máster en cuanto a nuestros Absolutos!`;
        }

        const fecha = new Date();
        const usuarioRanking = await Ranking.findOne({correo:session.correo});
        var fechaPartida = fecha.getDate() + '-' + (fecha.getMonth() +1) + '-' + fecha.getFullYear();
        var categoria = '';
        switch (session.categoria) {
            case 'P':
                categoria = 'Personajes'
                break;
            case 'PD':
                categoria = 'Poison Devils'
                break;
            case 'V':
                categoria = 'Verdacksal'
                break;
            case 'BR':
                categoria = 'Black Ravens'
                break;
            case 'G':
                categoria = 'Geografía'
                break;
            case 'R':
                categoria = 'Renegados'
                break;
            case 'TC':
                categoria = 'Todas'
                break;
        }
        const final = {
            nombre: session.nombre,
            correo: session.correo,
            puntuacion: session.puntos,
            categoria: categoria,
            fecha: fechaPartida
        }
        var arrayRanking = [];
        if (!usuarioRanking && session.nombre!=undefined) {
            await Ranking.create(final);
            arrayRanking = await Ranking.find().sort({puntuacion:-1});
            res.render("ranking", {error:'succes', mensaje: mensaje, nombre: session.nombre, error:'success', puntuacion:session.puntos, ranking:arrayRanking, time:0});
        } else if (session.puntos > usuarioRanking.puntuacion) {
            const id = usuarioRanking.id;
            const modificarRanking = await Ranking.findByIdAndUpdate(
                id, final, { useFindAndModify:false })
            arrayRanking = await Ranking.find().sort({puntuacion:-1});
            res.render("ranking", {error:'succes', mensaje: mensaje, nombre: session.nombre, error:'success', puntuacion:session.puntos, ranking:arrayRanking, time:0});
        } else {
            arrayRanking = await Ranking.find().sort({puntuacion:-1});
            res.render("ranking", {error:'success', mensaje: `Te hemos mantenido tu mejor puntuación ${session.nombre} ${usuarioRanking.puntuacion} puntos, en esta partida has conseguido ${session.puntos}!`, nombre: session.nombre, error:'success', puntuacion:session.puntos, ranking:arrayRanking, time:0});
        }
    }
});

module.exports = router;