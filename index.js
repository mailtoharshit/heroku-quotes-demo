"use strict";
/// <reference path="typings/index.d.ts" />
var express = require("express");
var bodyParser = require("body-parser");
var Quote = require("./entities/quote");
var mongoose = require("mongoose");
// node-restul doesn't have typings, so we'll have to use plain js require to get it :-(
var restful = require('node-restful');
// ===============
// COMMON VARIABLES
// ===============
var appPort = (process.env.PORT || 8080);
var connectionString = "mongodb://herokudbuser1:herokudbuser1pass@ds033046.mlab.com:33046/heroku_162d0dpz";
// ===============
// Express App
// ===============
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("port", appPort);
// ===============
// REST API LOGIC
// ===============
var quoteApi = restful.model("quote", Quote.schema)
    .methods(["get", "post", "put", "delete"])
    .register(app, "/api/quote");
// ===============
// DB 
// ===============
mongoose.connect(connectionString);
// ===============
// SERVER
// ===============
var port = app.get("port");
var server = app.listen(port, function () {
    console.log("connectionString is: " + connectionString);
    console.log("port is: " + port);
    console.log("Server started listening...");
});
//# sourceMappingURL=index.js.map