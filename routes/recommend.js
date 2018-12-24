let express = require('express');
let router = express.Router();
let {getSongList} = require('../http/getRecommend');

router.get('/getPersonalSong', (req, res, next) => {
    getSongList(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});

module.exports = router;