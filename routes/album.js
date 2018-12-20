let express = require('express');
let router = express.Router();
let getAlbumList = require('../http/getAlbumList');
let getAlbum = require('../http/getAlbumListBySinger');

//获取专辑列表
router.get('/getAlbumList', (req, res, next) => {
    getAlbumList(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
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

module.exports = router;