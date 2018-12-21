let express = require('express');
let router = express.Router();
let getRadio = require('../http/getRadio');

//获取电台信息
router.get('/getRadio', (req, res, next) => {
    getRadio().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});

module.exports = router;