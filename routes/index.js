var express = require('express');
var router = express.Router();

var controllerMongoCollection = require('../controllers/database.js');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('getAllOrders', controllerMongoCollection.getAllOrders);
router.post('/storeData', controllerMongoCollection.storeData);

