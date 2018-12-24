let express = require('express');
let router = express.Router();
let getTicket = require('../http/getTicketing');

router.get('/getTicket', (req, res, next) => {
    getTicket(req.query).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
});

module.exports = router;