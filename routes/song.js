let express = require('express');
let router = express.Router();
let getSongByAlbum = require('../http/getSongListByAlbum');

/**
 * [songList 根据歌手获取歌曲列表]
 * */
router.get('/songListBySinger', (req, res, next) => {
    getSongByAlbum(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});


router.get('/songListByAlbum', (req, res, next) => {
    //
});


module.exports = router;