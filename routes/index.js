var express = require('express');
var router = express.Router();

var controllerMongoCollection = require('../controllers/database.js');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});


router.post('/storeData', function(req, res) {
    res.render('order', { title: 'Order Details' });
});

module.exports = router;