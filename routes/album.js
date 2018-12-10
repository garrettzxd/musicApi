let express = require('express');
let router = express.Router();
let {SUCCESS, MISS_PARAMETER, UN_KNOW_ERROR} = require('../common/ErrorContans');
let paradigm = require('../common/Paradigm');
let {getAlbumList} = require('../model/album-model');

//获取专辑列表
router.get('/albumList', (req, res, next) => {
    getAlbumList(req.query).then((data) => {
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

//获取单张专辑歌曲
router.get('/albumSong', (req, res, next) => {});

module.exports = router;