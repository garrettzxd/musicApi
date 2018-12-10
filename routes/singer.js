let express = require('express');
let router = express.Router();
let paradigm = require('../common/Paradigm');
let {SUCCESS, MISS_PARAMETER, UN_KNOW_ERROR} = require('../common/ErrorContans');
let {
    getSingerList,
    getSingerSongList
} = require('../model/singer');

//获取歌手列表
router.get('/singerList', (req, res, next) => {
    //do something
    getSingerList(req.query).then((data) => {
        console.log('data is:',data);
        let result = paradigm({
            message: SUCCESS,
            data: Object.values(data)
        });
        res.json(result);
    }).catch((err) => {
        res.json(err);
    })
});

//根据歌手mid获取歌手歌曲列表
router.get('/singerSongList', (req, res, next) => {
    let {singer_mid} = req.query;
    if (!singer_mid) {
        let result = paradigm({
            message: MISS_PARAMETER,
            data: {}
        });
        res.json(result);
    }else {
        next()
    }
}, (req, res, next) => {
    getSingerSongList(req.query).then((data) => {
        let result = paradigm({
            message: SUCCESS,
            data: Object.values(data)
        });
        res.json(result);
    }).catch((err) => {
        console.log(err);
        let result = paradigm({
            message: UN_KNOW_ERROR,
            data: err
        });
        res.json(result);
    })
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