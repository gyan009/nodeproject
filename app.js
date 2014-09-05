var mongoose = require('mongoose');
var express = require('express');

// add mongoose query and promise support to express
require('express-mongoose');

var models = require('./models');
var routes = require('./routes');
var middleware = require('./middleware');

mongoose.set('debug', true);
var databaseUrl = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/nodejs'; // "username:password@example.com/mydb"
var collections = ["admin", "ZrVUM5jxyvqZ"];
mongoose.connect(databaseUrl, collections, function (err) {
    if (err) throw err;

    var app = express();
    middleware(app);
    routes(app);
    app.listen(process.env.PORT || 3000, function () {
        console.log('now listening on http://localhost:3000');
    })
})
