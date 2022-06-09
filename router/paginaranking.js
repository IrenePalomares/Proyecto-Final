const express = require('express');
const session = require('express-session');
const router = express.Router();
const Ranking = require('../models/ranking');

router.get('/', async(req, res) =>{
        const arrayRanking = await Ranking.find().sort({puntuacion:-1});

        res.render('ranking', {error:'no hay error', nombre:session.nombre, ranking: arrayRanking})
});

module.exports = router;