let express = require('express');
let router = express.Router();
let getAlbumList = require('../http/getAlbumList');

//获取专辑列表
router.get('/getAlbumList', (req, res, next) => {
    getAlbumList(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

//获取单张专辑歌曲
router.get('/albumSong', (req, res, next) => {});

module.exports = router;