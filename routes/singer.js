let express = require('express');
let router = express.Router();
let getSinger = require('../http/getSingerList');
let getMV = require('../http/getMVListBySinger');
//获取歌手列表
router.get('/getSingerList', (req, res, next) => {
    getSinger(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({err: 'occur an error!'});
    });
});


//根据歌手mid获取歌手mv
router.get('/getMVBySinger', (req, res, next) => {
    getMV(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});

//获取歌手描述
router.get('/singerDescribe', (req, res, next) => {
    //do something
});

module.exports = router;