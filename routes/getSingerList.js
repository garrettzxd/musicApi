let express = require('express');
let router = express.Router();
let getSinger = require('../model/singer');
/* GET users listing. */
router.get('/', (req, res, next) => {
    getSinger(req.query).then((data) => {
        res.json(Object.values(data));
    }).catch((err) => {
        res.json(err);
    })
});

module.exports = router;
