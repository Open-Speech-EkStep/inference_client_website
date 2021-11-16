"use strict";
require('dotenv').config();
const grpc = require("grpc");
grpc.max_send_message_length = 50 * 1024 * 1024;
// grpc.max_receive_message_length = 50 * 1024 * 1024;
var express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var ss = require('socket.io-stream');
ss.forceBase64 = true;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    },
    allowEIO: true
});
// io.set('origins', '*:*');
const path = require("path");
const fs = require("fs");
const { addFeedback, getFeedback } = require('./dbOperations');
const {convert_shreedev_to_unicode, convert_krutidev_to_unicode, convert_aakruti_to_unicode} = require('./text_encoding_converters');
app.use(express.static(path.join(__dirname, "static")));

const MAX_SOCKET_CONNECTIONS = process.env.MAX_CONNECTIONS || 80;

const ip_language_maps = require("./ip_language_map.json");
let ip_language_map = {};
for(let [ip, config] of Object.entries(ip_language_maps)){
    ip_language_map[ip] = config["languages"];
}
let languageConnectionCountMap = {};
for(let [ip, config] of Object.entries(ip_language_maps)){
    const languages = config["languages"];
    for (let index in languages){
        languageConnectionCountMap[languages[index]] = config["maxConnectionCount"];
    }
}
const LANGUAGES = require("./language_details.json");
const language_ids = LANGUAGES.map(language=> language.id)

const { uploadFile } = require('./uploader');
const PROTO_PATH =
    __dirname +
    (process.env.PROTO_PATH || "/audio_to_text.proto");
const protoLoader = require("@grpc/proto-loader");
const { allowedNodeEnvironmentFlags } = require('process');

app.set('view engine', 'ejs');

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
let proto = grpc.loadPackageDefinition(packageDefinition).recognize;
const idDict = {};
const userCalls = {};

function make_message(audio, user, speaking, language = 'en', isEnd) {
    const msg = {
        audio: audio,
        user: user + "",
        language: language,
        speaking: speaking,
        isEnd: isEnd
    };
    return msg;
}
function make_file_message(audio, user, language = 'en', fileName) {
    const msg = {
        audio: audio,
        user: user + "",
        language: language,
        filename: fileName
    };
    return msg;
}

function onResponse(response) {
    const data = JSON.parse(response.transcription);
    const id = data["id"];
    const user = response.user;
    if (idDict[user] && idDict[user] === id) {
        return;
    } else {
        idDict[user] = id;
    }
    if (!data["success"]) {
        return;
    }
    if (response.action === "terminate") {
        io.to(response.user).emit("terminate");
    } else {
        io.to(response.user).emit("response", data["transcription"], response.language);
    }
}

function onUserConnected(socket, grpc_client) {
    userCalls[socket.id] = grpc_client.recognize_audio();
    userCalls[socket.id].on("data", onResponse);
    io.to(socket.id).emit("connect-success", "");
}

function startServer() {
    const currentDateAndTime = () => {
        return new Date().toISOString().replace(/[-:T.]/g, '');
    };
    const randomString = () => {
        return (Math.random() + 1).toString(36).substring(2, 10);
    };
    const multer = require('multer');
    const multerStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            if (!fs.existsSync('uploads')) {
                fs.mkdirSync('uploads');
                console.log('Created directory uploads');
            }
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, currentDateAndTime() + '_' + randomString() + '.wav');
        },
    });
    const upload = multer({ storage: multerStorage });
    app.use(upload.single('audio_data'));
    app.get('/test-stream', (req, res) => {
        res.render("test_stream", { root: __dirname });
    });
    
    app.get("/", function (req, res) {
        res.redirect("/hindi");
    });

    app.get("/feedback", function (req, res) {
        res.sendFile("views/feedback.html", { root: __dirname });
    });

    app.get("/encode-text", (req, res) => {
        const { text, type } = req.query;
        console.log(text, type, "GOT")
        try{
            if(text){
                if(type){
                    let input_type = type.toLowerCase();
                    let result = "";
                    if(input_type === "shreedev"){
                        result = convert_shreedev_to_unicode(text);
                    } else if (input_type === "krutidev"){
                        result = convert_krutidev_to_unicode(text);
	                } else if (input_type === "aakruti") {
			            result = convert_aakruti_to_unicode(text);
                    } else {
                        res.status(400).send("Please enter a valid type of encoding for given input")
                        return;
                    }
                    res.json({ "encoded_data": result });
                } else {
                    res.status(400).send("Please enter a valid type of encoding for given input")
                }
            } else {
                res.status(400).send("Please provide a text to convert to unicode");
            }
        } catch(err){
            console.log(err);
            res.sendStatus(400);
        }
        console.log("FINISHED WITHOUT PROCESS")
    });

    app.get("/:language", function (req, res) {
        const language = req.params.language;
        if (language_ids.includes(language.toLowerCase())) {
            res.render("index", { root: __dirname, languages_map: LANGUAGES });
        } else {
            res.render("not-found", { root: __dirname, languages_map: LANGUAGES });
        }
    });

    const getSrtResponse = (grpc_client, msg) => {
        return new Promise((resolve, reject) => {
            grpc_client.recognize_srt(msg, (error, response) => {
                if (error) { reject(error); }
                resolve(response);
            });
        });
    }

    const getPunctuation = (grpc_client, msg) => {
        return new Promise((resolve, reject) => {
            grpc_client.punctuate(msg, (error, response) => {
                if (error) { reject(error); }
                resolve(response);
            });
        });
    }

    app.post("/batch-service", function (req, res) {
        const file = req.file;
        const { language, user } = req.body;
        let data = fs.readFileSync(file.path);
        let grpc_ip = 'localhost:55102';
        for (let ip in ip_language_map) {
            if (ip_language_map[ip].includes(language)) {
                grpc_ip = ip;
                break;
            }
        }
        let grpc_client = new proto.Recognize(
            grpc_ip,
            grpc.credentials.createInsecure()
        );
        const msg = {
            audio: data,
            user: user,
            language: language,
            filename: file.filename
        };
        getSrtResponse(grpc_client, msg).then(response => {
            res.json({ "data": response });
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        }).finally(() => {
            grpc.closeClient(grpc_client);
            fs.unlink(file.path, function (err) {
                if (err) {
                    console.log(`File ${file.path} not deleted!`);
                    console.log(err);
                } else {
                    console.log(`File ${file.path} deleted!`)
                }
            });
        })
    });

    app.post("/punctuate", (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const { text, language } = req.body;

        if (text === null || text === undefined || text.length === 0 || text === "null"){
            res.json({ "data": {"text": ""} });
            return;
        }

        let grpc_ip;// = 'localhost:55102';
        for (let ip in ip_language_map) {
            if (ip_language_map[ip].includes(language)) {
                grpc_ip = ip;
                break;
            }
        }
        let grpc_client = new proto.Recognize(
            grpc_ip,
            grpc.credentials.createInsecure()
        );
        const msg = {
            text: text,
            language: language,
            enabledItn: true
        }
        getPunctuation(grpc_client, msg).then(response => {
            res.json({ "data": response });
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        }).finally(() => {
            grpc.closeClient(grpc_client);
        })
    })

    app.post("/api/feedback", function (req, res) {
        const file = req.file;
        const { user_id, language, text, rating, feedback, device, browser, date } = req.body;

        uploadFile(file.path, user_id, language)
            .then((uploadResponse) => {
                const blobName = uploadResponse[0]['metadata']['name'];
                const bucketName = uploadResponse[0]['metadata']['bucket'];
                const audio_path = `https://storage.googleapis.com/${bucketName}/${blobName}`
                addFeedback(user_id, language, audio_path, text, rating, feedback, device, browser, date).then(() => {
                    res.json({ "success": true })
                }).catch(err => {
                    console.log("error", err)
                    res.status(500).json({ "success": false })
                })
            })
            .catch((err) => {
                console.error("error", err);
                res.sendStatus(500);
            })
            .finally(() => {
                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.log(`File ${file.path} not deleted!`);
                        console.log(err);
                    }
                });
            });
    })

    app.get("/api/feedback", function (req, res) {
        const start = Number(req.query.start) || 0;
        const size = Number(req.query.length) || 10;
        const ratingFilter = req.query.rating_filter || '';
        const deviceFilter = req.query.device_filter || '';
        const browserFilter = req.query.browser_filter || '';
        const dateFilter = req.query.date_filter || '';
        getFeedback(start, size, ratingFilter, deviceFilter, browserFilter, dateFilter).then(result => {
            res.json({
                "draw": req.query.draw | 1,
                "recordsTotal": result['total'],
                "recordsFiltered": result['filtered'],
                "data": result['data']
            })
        }).catch(err => {
            console.log(err);
            if (err.name && err.name == 'QueryResultError') {
                res.json({
                    "draw": req.query.draw | 1,
                    "recordsTotal": 0,
                    "recordsFiltered": 0,
                    "data": []
                })
            } else {
                res.status(500).json({ "success": false })
            }
        })
    })

    app.get("*", (req, res) => {
        res.render("not-found", { root: __dirname, languages_map: LANGUAGES });
    })

    const PORT = 9008;
    server.listen(PORT);
    console.log("Listening in port => " + PORT);
}

function main() {
    io.on("connection", (socket) => {
        let grpc_ip; //= 'localhost:55102';
        let currentLanguage = socket.handshake.query.language;
        for (let ip in ip_language_map) {
            if (ip_language_map[ip].includes(currentLanguage)) {
                grpc_ip = ip;
            }
        }
        let grpc_client = new proto.Recognize(
            grpc_ip,
            grpc.credentials.createInsecure()
        );
        socket.on("disconnect", (reason) => {
            if (socket.id in userCalls) {
                userCalls[socket.id].end();
                delete userCalls[socket.id];
            }
            console.log(socket.id, "got disconnected", reason);
            grpc.closeClient(grpc_client);
        });

        const numUsers = socket.client.conn.server.clientsCount;
        console.log("Number of users => ", numUsers, languageConnectionCountMap[currentLanguage]);
        if (numUsers > languageConnectionCountMap[currentLanguage]) {
            socket.emit("abort");
            socket.disconnect();
            console.log("CAllled");
            return;
        }
        console.log("Connected=> ", currentLanguage)
        socket.on('connect_mic_stream', () => {
            onUserConnected(socket, grpc_client);
            socket.on("mic_data", function (chunk, language, speaking, isEnd) {
                let user = socket.id;
                let message = make_message(chunk, user, speaking, language, isEnd);
                userCalls[user].write(message)
            });
        });

        socket.on('connect_file_stream', () => {
            console.log("CONNECT FILE STREAM CALLED");
            userCalls[socket.id] = grpc_client.recognize_audio_file_mode();
            userCalls[socket.id].on("data", (response) => {
                const data = JSON.parse(response.transcription);
                io.to(response.user).emit("file_upload_response", data["transcription"], response.language);
                userCalls[socket.id].end();
            });
            ss(socket).on("file_data", function (fileStream, data) {
                let language = data.language;
                let fileName = data.name;
                console.log("called here", language, fileName);
                fileStream.on('data', function (chunk) {
                    console.log("called file data");
                    let user = socket.id;
                    let message = make_file_message(chunk, user, language, fileName);
                    userCalls[socket.id].write(message);
                });
                fileStream.on('error', console.log);
                fileStream.on('end', () => {
                    console.log("ended");
                })
            });
            io.to(socket.id).emit("connect-success", "");
        });
    });
    startServer();
}

main();
