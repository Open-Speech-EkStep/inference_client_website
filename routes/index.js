const setApiRoutes = require('./api_routes');
const setUIRoutes = require('./ui_routes');

const setRouter = (app) => {
    setApiRoutes(app);
    setUIRoutes(app);
}

module.exports = setRouter;