let express = require('express');
let router = express.Router();
let getSinger = require('../http/getSingerList');
let getSong = require('../http/getSongListBySinger');
let getAlbum = require('../http/getAlbumListBySinger');
let getMV = require('../http/getMVListBySinger');
//获取歌手列表
router.get('/getSingerList', (req, res, next) => {
    getSinger(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({err: 'occur an error!'});
    });
});

//根据歌手mid获取歌手歌曲列表
router.get('/getSongListBySinger', (req, res, next) => {
    getSong(req.query).then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});

//根据歌手mid获取专辑列表
router.get('/getAlbumListBySinger', (req, res, next) => {
    getAlbum(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});

//获取歌手mv
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