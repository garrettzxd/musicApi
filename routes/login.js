var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource!!!!!!!');
    console.log('dirname is:',__dirname);
    res.json([{name:1},{nick:2}]);
});

module.exports = router;
