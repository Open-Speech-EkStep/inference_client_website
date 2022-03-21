const { addFeedback, getFeedback, getUserDetails } = require('./../dbOperations');
const { uploadFile } = require('./../uploader');
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
        // res.setHeader('Access-Control-Allow-Origin', '*');
        const language = req.params.language;
        const baseUrl = process.env.ASR_BASE_URL;
        try {
            const resp = await axios.post(`${baseUrl}/asr/v1/recognize/${language}`, req.body);
            res.json(resp.data);
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
    });

    app.post("/v1/punctuate/:language", async (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', '*');
        const { text, enabledItn } = req.body;
        let language = req.params.language;
        try{
            const baseUrl = process.env.PUNCTUATION_BASE_URL;
            const requestBody = { "text": text, "enabledItn": enabledItn  };
            const resp = await axios.post(`${baseUrl}/asr/v1/punctuate/${language}`, requestBody);
            res.json(resp.data);
        } catch(err){
            console.log(err)
            res.sendStatus(500);
        }
    })

    app.post("/tts/infer/:language", async (req, res) => {
        try{
            let language = req.params.language;
            const baseUrl = `${TTS_BASE_URL}/tts/v1/${language}`;
            console.log(baseUrl)
            const resp = await axios.post(`${baseUrl}`, req.body);
            res.json(resp.data);
        } catch(err){
            console.log(err)
            res.sendStatus(500);
        }
    })

    app.post("/api/feedback", function (req, res) {
        const file = req.file;
        const { user_id, language = "", text, audio_duration, rating=0, feedback="", device, browser, date, username="", age = 0, gender="", feedbackCategories=[], original_text = "" } = req.body;
        
        if(!original_text || original_text.trim().length === 0){
            return res.status(400).json({"success": false, "message": "Please provide expected text"})
        }

        if(!language || language.trim().length === 0){
            return res.status(400).json({"success": false, "message": "Please provide language"})
        }

        if(!username || username.trim().length === 0){
            return res.status(400).json({"success": false, "message": "Please provide username"})
        }

        if(!gender || gender.trim().length === 0){
            return res.status(400).json({"success": false, "message": "Please provide gender"})
        }

        if(age === 0){
            return res.status(400).json({"success": false, "message": "Please provide age"})
        }

        if(rating === 0){
            return res.status(400).json({"success": false, "message": "Please provide rating"})
        }

        if(feedbackCategories.length === 0){
            return res.status(400).json({"success": false, "message": "Please provide feedback categories"})
        }



        uploadFile(file.path, user_id, language)
            .then((uploadResponse) => {
                const blobName = uploadResponse[0]['metadata']['name'];
                const bucketName = uploadResponse[0]['metadata']['bucket'];
                const audio_path = `https://storage.googleapis.com/${bucketName}/${blobName}`
                addFeedback(user_id, language, audio_path,audio_duration, text, rating, feedback, device, browser, date, username, age, gender, JSON.parse(feedbackCategories), original_text).then(() => {
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
        let dateFilter = JSON.parse(req.query.date_filter || []);
        dateFilter = dateFilter.length === 0 ? '' : dateFilter;
        const userNameFilter = req.query.username_filter || '';
        const languageFilter = req.query.language_filter || '';
        getFeedback(start, size, ratingFilter, deviceFilter, browserFilter, dateFilter, userNameFilter, languageFilter).then(result => {
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
    });

    app.get("/api/feedback/user/:username", (req, res)=>{
        const username = req.params.username || "";
        if(username === ""){
            res.sendStatus(400);
        } else {
            getUserDetails(username).then(result=>{
                res.json(result);
            }).catch(err=>{
                console.log(err);
                res.status(500).json({ "success": false })
            })
        }
    })
};

module.exports = setApiRoutes;
