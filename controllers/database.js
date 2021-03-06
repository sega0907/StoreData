var MongoClient = require('mongodb').MongoClient;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://sega0907:0jamajodoremi@ds051831.mlab.com:51831/heroku_jw552rkk';
//var express = require('storeData');
//var router = storeData.Router();

/*var bodyParser = require('body-parser');
var path = require ('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode*/
//########################################
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

router.post('/storeData', function(req, res, next)
{
    var body = JSON.stringify(req.body);  //if wanted entire body as JSON
    var params = JSON.stringify(req.params);//if wanted parameters
    var firstname = req.body.billfirstname;  //
    var lastname = req.body.billlastname; //to work with separtors on any OS including Windows
    var street = req.body.billaddress1; //for use in GET Query string of form URI/path?name=value
    var city = req.body.billcity;
    var bstate = req.body.billstate; //to work with separtors on any OS including Windows
    var zip = req.body.billzip; //for use in GET Query string of form URI/path?name=value
    var email = req.body.billemail;
    var cardtype = req.body.cardtype; //to work with separtors on any OS including Windows
    var cardnumber = req.body.cardnumber; //for use in GET Query string of form URI/path?name=value
    var cardexp = req.body.cardexpyear;
    var cardcvv = req.body.cardcvv; //to work with separtors on any OS including Windows
    var shipstreet = req.body.shipaddress1 + shipaddress2; //for use in GET Query string of form URI/path?name=value
    var shipcity = req.body.shipcity;
    var shipstate = req.body.shipstate; //to work with separtors on any OS including Windows
    var shipzip = req.body.shipzip; //for use in GET Query string of form URI/path?name=value
    var total = req.body.total; //for use in GET Query string of form URI/p
});
/*module.exports.getAllOrders =  function (request, response) {

    MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        var theDatabase = client.db('heroku_jw552rkk');
        var cid = getRandomArbitrary(10000, 20000);
        var bid = getRandomArbitrary(20001, 30000);
        var sid = getRandomArbitrary(30001, 40000);
        var oid = getRandomArbitrary(40001, 50000);
        var date = new Date();
        var ndate = date.getDate();

        var customerdata = {
            CID: cid,
            FIRSTNAME: firstname,
            LASTNAME: lastname,
            STREET: street,
            CITY: city,
            STATE: bstate,
            ZIP: zip,
            EMAIL: email
        };
        CUSTOMERS.insertOne(customerdata, function (err, result) {
            if (err) throw err;
        });
        var billingdata = {
            BID: bid,
            CUSTOMER_ID: cid,
            CREDITCARDTYPE: cardtype,
            CREDITCARDNUM: cardnumber,
            CREDITCARDEXP: cardexp,
            CREDITCARDSECURITYNUM: cardcvv
        };
        BILLING.insertOne(billingdata, function (err, result) {
            if (err) throw err;
        });
        var shippingdata = {
            SID: sid,
            CUSTOMER_ID: cid,
            SHIPPING_STREET: shipstreet,
            SHIPPING_CITY: shipcity,
            SHIPPING_STATE: shipstate,
            SHIPPING_ZIP: shipzip
        };
        SHIPPING.insertOne(shippingdata, function (err, result) {
            if (err) throw err;
        });
        var orderdata = {
            OID: oid,
            CID: cid,
            BID: bid,
            SID: sid,
            DATE: ndate,
            ORDER_TOTAL: total
        };
        ORDERS.insertOne(orderdata, function (err, result) {
            if (err) throw err;
        });
        MongoClient.close(function (err) {
            if(err) throw err;
        });
    });
    db.collection("ORDERS").find({}).toArray(function (err, docs) {
        if(err) throw err;

        response.render('storeData', {results: docs});
        db.close();

    });
};*/
module.exports.storeData = function (request, response) {

    const { parse } = require('querystring');
    if (request.method === 'POST') {
        var finalOrder = request.body.order;
        response.send(finalOrder);
    }

    var print = JSON.parse(finalOrder);
    console.log(print);

    mongodb.MongoClient.connect(mongoDBURI, function(err,  client) {
        if(err) throw err;

        //get handle to the databse
        var theDatabase = client.db('heroku_jw552rkk');

        //get collection of Orders
        var Customers = theDatabase.collection('CUSTOMERS');
        var Billing = theDatabase.collection('BILLING');
        var Shipping = theDatabase.collection('SHIPPING');
        var Orders = theDatabase.collection('ORDERS');

        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);

        var customerdata = {
            CID: customerID,
            FIRSTNAME: JSON.parse(finalOrder).firstname,
            LASTNAME: JSON.parse(finalOrder).lastname,
            STREET: JSON.parse(finalOrder).address1 + ' ' + JSON.parse(finalOrder).address2,
            CITY: JSON.parse(finalOrder).city,
            STATE: JSON.parse(finalOrder).state,
            EMAIL: JSON.parse(finalOrder).email
        };

        var shippingdata = {
            SID: shippingID,
            STREET: JSON.parse(finalOrder).address1 + ' ' + JSON.parse(finalOrder).address2,
            CITY: JSON.parse(finalOrder).city,
            STATE: JSON.parse(finalOrder).state
        };

        var billingdata = {
            BID: billingID,
            CREDITCARDTYPE: JSON.parse(finalOrder).cardtype,
            CREDITCARDNUM: JSON.parse(finalOrder).cardnumber,
            CREDITCARDEXP: JSON.parse(finalOrder).cardexpmonth,
            CREDITCARDYR: JSON.parse(finalOrder).cardexpyear,
            CREDITCARDSECURITYNUM: JSON.parse(finalOrder).cardcvv
        };

        var orders = {
            PRODUCT_VECTOR: JSON.parse(finalOrder)['productdetails']
        };

        Customers.insertOne(customerdata, function (err, result) {
            if (err) throw err;
        });

        Billing.insertOne(billingdata, function (err, result) {
            if (err) throw err;
        });

        Shipping.insertOne(shippingdata, function (err, result) {
            if (err) throw err;
        });

        Orders.insertOne(orders, function (err, result) {
            if (err) throw err;
        });
    });
};