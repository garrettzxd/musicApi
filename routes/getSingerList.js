let express = require('express');
let router = express.Router();
let paradigm = require('../common/Paradigm');
let getSinger = require('../model/singer');


router.get('/', (req, res, next) => {
    getSinger(req.query).then((data) => {
        let result = paradigm({
            data: Object.values(data)
        });
        res.json(result);
    }).catch((err) => {
        res.json(err);
    })
});

module.exports = router;
