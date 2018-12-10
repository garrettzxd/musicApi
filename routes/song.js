let express = require('express');
let router = express.Router();
let {SUCCESS, MISS_PARAMETER, UN_KNOW_ERROR} = require('../common/ErrorContans');
let paradigm = require('../common/Paradigm');
let {
    getSongListByAlbum,
    getSongListBySinger
} = require('../model/song-model');

/**
 * [songList 根据歌手获取歌曲列表]
 * */
router.get('/songListBySinger', (req, res, next) => {
    let {singer_mid} = req.query;
    if (!singer_mid) {
        res.json(paradigm({
            message: MISS_PARAMETER,
            data: {}
        }))
    }else {
        next();
    }
}, (req, res, next) => {
    getSongListBySinger(req.query).then((data) => {
        res.json(paradigm({
            message: SUCCESS,
            data: Object.values(data)
        }))
    }).catch((err) => {
        res.json(paradigm({
            message: UN_KNOW_ERROR,
            data: {},
            err_msg: new Error(err)
        }))
    })
});


router.get('/songListByAlbum', (req, res, next) => {
    let {album_mid} = req.query;
    if (!album_mid) {
        res.json(paradigm({
            message: MISS_PARAMETER,
            data: {}
        }))
    }else {
        next();
    }
}, (req, res, next) => {
    getSongListByAlbum(req.query).then((data) => {
        res.json(paradigm({
            message: SUCCESS,
            data: Object.values(data)
        }))
    }).catch((err) => {
        res.json(paradigm({
            message: UN_KNOW_ERROR,
            data: {},
            err_msg: new Error(err)
        }))
    })
});


module.exports = router;