const express = require('express');
const session = require('express-session');
const router = express.Router();
const Ranking = require('../models/ranking');

router.get('/', async(req, res) =>{
    try {
        const arrayRanking = await Ranking.find().sort({puntuacion:-1});
        console.log(arrayRanking);
        res.render('ranking', {error:'no hay error', nombre:session.nombre, ranking: arrayRanking})
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;