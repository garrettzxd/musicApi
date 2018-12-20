let express = require('express');
let router = express.Router();
let getSong = require('../http/getSongListBySinger');
let getSongByAlbum = require('../http/getSongListByAlbum');

/**
 * [songList 根据歌手获取歌曲列表]
 * */
router.get('/songListBySinger', (req, res, next) => {
    getSong(req.query).then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});


router.get('/songListByAlbum', (req, res, next) => {
    getSongByAlbum(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});


module.exports = router;