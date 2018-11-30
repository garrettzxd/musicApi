let express = require('express');
const mysql = require('../mysql/index')
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({user:'garrett'})
});

router.get('/test', (req, res, next) => {
    mysql.select('SELECT * FROM singer LIMIT 10').then((res1) => {
        res.json(Object.values(res1));
    });
});

module.exports = router;
