let express = require('express');
let router = express.Router();
const mysql = require('../mysql/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
    let sql = 'SELECT * FROM singer LIMIT 30';
    mysql.select(sql).then((data) => {
        res.json(Object.values(data));
    })
});

module.exports = router;
