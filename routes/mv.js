let express = require('express');
let router = express.Router();
let getMV = require('../http/getMVListBySinger');

//根据歌手mid获取歌手mv
router.get('/getMVBySinger', (req, res, next) => {
    getMV(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});

module.exports = router;