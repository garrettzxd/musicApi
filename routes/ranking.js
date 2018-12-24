let express = require('express');
let router = express.Router();
let {getRanking, getRankingType} = require('../http/getRankingList');

router.get('/getRankingList', (req, res, next) => {
    getRanking(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});

router.get('/getRankingTypeList', (req, res, next) => {
    getRankingType().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});

module.exports = router;