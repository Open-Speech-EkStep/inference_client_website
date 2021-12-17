const { addFeedback, getFeedback } = require('./../dbOperations');
const { uploadFile } = require('./../uploader');
const GrpcClient = require('./../proxy/grpc_client');
const fs = require("fs");
const multer = require('multer');
const axios = require('axios');

function setApiRoutes(app) {

    const currentDateAndTime = () => {
        return new Date().toISOString().replace(/[-:T.]/g, '');
    };
    const randomString = () => {
        return (Math.random() + 1).toString(36).substring(2, 10);
    };


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

    app.post("/alt/asr/:language", async function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const language = req.params.language;
        try {
            const resp = await axios.post("https://meity-dev-asr.ulcacontrib.org/asr/v1/recognize/" + language, req.body);
            res.json(resp.data);
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
    });

    app.post("/batch-service", async function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const file = req.file;
        const { language } = req.body;
        let data = fs.readFileSync(file.path);
        let dataBase64 = data.toString('base64');
        const requestBody = {};
        // requestBody["config"] = { "transcriptionFormat": { "value": "srt" }, audioFormat: "wav" }
        requestBody["audio"] = [{ "audioContent": dataBase64 }]
        try {
            const resp = await axios.post("https://meity-dev-asr.ulcacontrib.org/asr/v1/recognize/" + language, requestBody);
            console.log(resp.data);
            res.json({ "data": {"srt" : resp.data["output"][0]["source"] } });
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
        fs.unlink(file.path, function (err) {
            if (err) {
                console.log(`File ${file.path} not deleted!`);
                console.log(err);
            } else {
                console.log(`File ${file.path} deleted!`)
            }
        });
    });

    app.post("/v1/punctuate/:language", async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const { text, enableITN } = req.body;
        let language = req.params.language;
        try{
            const baseUrl = 'https://meity-dev-asr.ulcacontrib.org';
            const requestBody = { "text": text, "enableITN": enableITN === true ? true : false  };
            const resp = await axios.post(`${baseUrl}/asr/v1/punctuate/${language}`, requestBody);
            res.json({ "data": resp.data });
        } catch(err){
            console.log(err)
            res.sendStatus(500);
        }
    })

    app.post("/punctuate", async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const { text, language } = req.body;
        try{
            const baseUrl = 'https://meity-dev-asr.ulcacontrib.org';
            const requestBody = { "text": text, "enableITN": true  };
            const resp = await axios.post(`${baseUrl}/asr/v1/punctuate/${language}`, requestBody);
            res.json({ "data": resp.data });
        } catch(err){
            console.log(err)
            res.sendStatus(500);
        }
    })

    app.post("/api/feedback", function (req, res) {
        const file = req.file;
        const { user_id, language, text, rating, feedback="", device, browser, date, username, age, gender, feedbackCategories } = req.body;
        uploadFile(file.path, user_id, language)
            .then((uploadResponse) => {
                const blobName = uploadResponse[0]['metadata']['name'];
                const bucketName = uploadResponse[0]['metadata']['bucket'];
                const audio_path = `https://storage.googleapis.com/${bucketName}/${blobName}`
                addFeedback(user_id, language, audio_path, text, rating, feedback, device, browser, date, username, age, gender, JSON.parse(feedbackCategories)).then(() => {
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
};

module.exports = setApiRoutes;