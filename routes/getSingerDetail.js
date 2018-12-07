let express = require('express');
let router = express.Router();
let paradigm = require('../common/Paradigm');
let singerDetail = require('../model/singerDetail');
let {MISS_PARAMETER,UN_KNOW_ERROR} = require('../common/ErrorContans');

router.get('/', (req, res, next) => {
    let {singer_mid} = req.query;
    // res.json(!singer_mid);
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
    singerDetail(req.query).then((data) => {
        let result = paradigm({
            data: Object.values(data)
        });
        res.json(result);
    }).catch((err) => {
        let result = paradigm({
            message: UN_KNOW_ERROR
        });
        res.json(result);
    })
});

module.exports = router;
