const routes = require('express').Router();
const authenticate = require('../middlewares/auth').authenticate;

const { findAllToons } = require('../controllers/santoon');
const { findAllEpisodes } = require('../controllers/episode');
const { findAllPages } = require('../controllers/page');

routes.get('/', authenticate, findAllToons);
routes.get('/:santoonId/episodes', findAllEpisodes);
routes.get('/:santoonId/episode/:episodeId', findAllPages);

module.exports = routes;