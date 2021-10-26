"use strict";
require('dotenv').config();

const path = require("path");

var express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = require("http").createServer(app);
const {initializeSocketServer, listenToSocketConnections} = require('./socket_server');
const setRouter = require('./routes');

app.use(express.static(path.join(__dirname, "static")));
app.set('view engine', 'ejs');


const io = initializeSocketServer(server);
listenToSocketConnections(io);

setRouter(app)

const PORT = 9008;
server.listen(PORT);
console.log("Listening in port => " + PORT);
