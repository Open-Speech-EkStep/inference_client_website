"use strict";
require('dotenv').config();

const path = require("path");
const cors = require("cors");

var express = require("express");
const app = express();
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

const server = require("http").createServer(app);
const setProxy = require('./proxy');
const setRouter = require('./routes');

app.use(express.static(path.join(__dirname, "static")));
app.set('view engine', 'ejs');

const corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions));

// setProxy(server);

setRouter(app)

const PORT = 9008;
server.listen(PORT);
console.log("Listening in port => " + PORT);
