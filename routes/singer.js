let express = require('express');
let router = express.Router();
let getSinger = require('../http/getSinger');
//获取歌手列表
router.get('/getSingerList', (req, res, next) => {
    getSinger(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({err: 'occur an error!'});
    });
});

//根据歌手mid获取歌手歌曲列表
router.get('/singerSongList', (req, res, next) => {

});

//获取歌手描述
router.get('/singerDescribe', (req, res, next) => {
    //do something
});

//获取歌手mv
router.get('/singerMV', (req, res, next) => {
    //do something
});

module.exports = router;