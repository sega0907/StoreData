var mongodb = require('mongodb').mongodb;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://sega0907:0jamajodoremi@ds051831.mlab.com:51831/heroku_jw552rkk';
var express = require('storeData');
var router = storeData.Router();

var bodyParser = require('body-parser');
var path = require ('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode
//########################################
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

router.post('/storeData', function(req, res, next)
{
    var body = JSON.stringify(req.body);  //if wanted entire body as JSON
    var params = JSON.stringify(req.params);//if wanted parameters
    var firstname = req.body.billfirstname;
    var lastname = req.body.billlastname; //to work with separtors on any OS including Windows
    var street = req.body.'"" + billaddress1 + billaddress2'; //for use in GET Query string of form URI/path?name=value
    var city = req.body.billcity;
    var bstate = req.body.billstate; //to work with separtors on any OS including Windows
    var zip = req.body.billzip; //for use in GET Query string of form URI/path?name=value
    var email = req.body.billemail;
    var cardtype = req.body.cardtype; //to work with separtors on any OS including Windows
    var cardnumber = req.body.cardnumber; //for use in GET Query string of form URI/path?name=value
    var cardexp = req.body.'"" + cardexpmonth + "/" cardexpyear';
    var cardcvv = req.body.cardcvv; //to work with separtors on any OS including Windows
    var shipstreet = req.body.'"" + shipaddress1 + shipaddress2)'; //for use in GET Query string of form URI/path?name=value
    var shipcity = req.body.shipcity;
    var shipstate = req.body.shipstate; //to work with separtors on any OS including Windows
    var shipzip = req.body.shipzip; //for use in GET Query string of form URI/path?name=value
    var order = req.body.order;
    var total = req.body.total; //for use in GET Query string of form URI/p
});
module.exports.getAllOrders =  function (request, response) {

    mongodb.MongoClient.connect('mongodb://sega0907:0jamajodoremi@ds051831.mlab.com:51831/heroku_jw552rkk', function(err, db) {
        if(err) throw err;
        // var theDatabase = client.db('heroku_jw552rkk');

        var dbo = db.db('heroku_jw552rkk');
            var myobj =
                { _id: getRandomArbitrary(10000, 20000),
                    FIRSTNAME: firstname, LASTNAME: lastname,
                    STREET: street, CITY: city, STATE: bstate,
                    ZIP: zip, EMAIL: email};

            dbo.collection("CUSTOMERS").insertOne(myobj, function(err, res) {
                if (err) throw err; });

        var dbi = db.db('heroku_jw552rkk');
            var myobj1 =
                {_id: getRandomArbitrary(20001, 30000),
                CUSTOMER_ID: myobj._id, CREDITCARDTYPE: cardtype,
                CREDITCARDNUM: cardnumber, CREDITCARDEXP: cardexp,
                CREDITCARDSECURITYNUM: cardcvv};
            dbi.collection("BILLING").insertOne(myobj1, function(err, res) {
                if (err) throw err; });

        var dba = db.db('heroku_jw552rkk');
            var myobj2 =
                {_id: getRandomArbitrary(30001, 40000),
                    CUSTOMER_ID: myobj._id, SHIPPING_STREET: shipstreet,
                    SHIPPING_CITY: shipcity, SHIPPING_STATE: shipstate,
                    SHIPPING_ZIP: shipzip
                };
            }
            dbo.collection("SHIPPING").insertOne(myobj2, function(err, res)
            { if (err) throw err; });

    var d = new Date(jsonDate);
        var dbc = db.db('heroku_jw552rkk');
            var myobj3 =
                {_id: getRandomArbitrary(40001, 50000),
                    CUSTOMER_ID: myobj._id, BILLING_ID: myobj1._id,
                    SHIPPING_ID: myobj2._id, DATE: d,
                    PRODUCT_VECTOR: order, ORDER_TOTAL: total};
            dbc.collection("ORDERS").insertOne(myObj3, function(err, res)
            { if (err) throw err; });

            db.close();
    };//end of connect
};//end function