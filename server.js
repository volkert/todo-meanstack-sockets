/**
 * Module dependencies.
 */
var //express = require('express'),
    feathers = require('feathers'),
    app = feathers(),
    fs = require('fs');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

//Load configurations
//if test env, load example file
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config'),
    mongoose = require('mongoose');

//Bootstrap db connection
var db = mongoose.connect(config.db);

//Bootstrap models
var models_path = __dirname + '/app/models';
var walk_models = function (path) {
  fs.readdirSync(path).forEach(function (file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(newPath);
      }
    } else if (stat.isDirectory()) {
      walk_models(newPath);
    }
  });
};
walk_models(models_path);

require('./config/express')(app);
require('./config/routes')(app);

app.configure(feathers.socketio());

//Bootstrap and register services Mapping: /<filenameWithEnding>
var services_path = __dirname + '/app/services';
var walk_services = function (path) {
  fs.readdirSync(path).forEach(function (file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        app.use('/' + file.slice(0, -3), require(newPath))
      }
    } else if (stat.isDirectory()) {
      walk_services(newPath);
    }
  });
};
walk_services(services_path);

app.listen(config.port);

console.log('Express app started on port ' + config.port);
exports = module.exports = app;

/**
 * old express config
 */
//var app = express();
//
////express settings
//require('./config/express')(app);
//
////Bootstrap routes
//require('./config/routes')(app);
//
////Start the app by listening on <port>
//var port = config.port;
//app.listen(port);
//console.log('Express app started on port ' + port);
//
////expose app
//exports = module.exports = app;

