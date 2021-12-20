const LANGUAGES = require("./../language_details.json");
const language_ids = LANGUAGES.map(language=> language.id)

function setUIRoutes(app){
    app.get('/test-stream', (req, res) => {
        res.render("test_stream", { root: __dirname });
    });

    app.get("/feedback", function (req, res) {
        res.render("feedback", { root: __dirname, languages_map: LANGUAGES });
    });

    app.get("/:language", function (req, res) {
        const language = req.params.language;
        if (language_ids.includes(language.toLowerCase())) {
            res.render("index", { root: __dirname, languages_map: LANGUAGES });
        } else {
            res.render("not-found", { root: __dirname, languages_map: LANGUAGES });
        }
    });

    app.get("/", function (req, res) {
        res.redirect("/hindi");
    });

    app.get("*", (req, res) => {
        res.render("not-found", { root: __dirname, languages_map: LANGUAGES });
    })
}

module.exports = setUIRoutes;