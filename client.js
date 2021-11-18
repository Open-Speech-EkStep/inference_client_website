"use strict";
require('dotenv').config();

const path = require("path");

var express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = require("http").createServer(app);
const setProxy = require('./proxy');
const setRouter = require('./routes');

app.use(express.static(path.join(__dirname, "static")));
app.set('view engine', 'ejs');


setProxy(server);

setRouter(app)

const PORT = 9008;
server.listen(PORT);
console.log("Listening in port => " + PORT);
