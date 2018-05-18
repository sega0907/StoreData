var express = require('express');
var XXX = express.Router();
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://sega0907:0jamajodoremi@ds051831.mlab.com:51831/heroku_jw552rkk';



//**************************************************************************
//***** mongodb get all of the Routes in Routes collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/pages/mongodb.ejs
XXX.get('/mongodb', function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err,  client) {
        if(err) throw err;
        //get handle to the database
        var theDatabase = client.db('heroku_jw552rkk');


        //get collection of Routes
        var Routes = db.collection('Routes');
        //get all Routes
        Routes.find({ }).sort({ name: 1 }).toArray(function (err, docs) {
            if(err) throw err;

            response.render('pages/mongodb', {results: docs});

        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect

});//end XXX.get