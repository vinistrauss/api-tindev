const express = require("express");
const devController = require('./controllers/devControllers');
const LikeController = require('./controllers/likeController');
const dislikeController = require('./controllers/dislikeController');
const superlikeController = require('./controllers/superlikeController');


const routes = express.Router();

//  GET, POST, PUT, DELETE
// req = REQUISIÇÃO por exemplo: http://localhost:3333/?nome='vinicius'
// res = RESPOTA que vai dar a partir daquela requisição

// routes.get("/", (req, res) => {   
//     return res.json({message: `Olá ${req.query.name}`});
// });

routes.post("/devs", devController.store);
routes.post("/devs/:devId/likes", LikeController.store)
routes.post("/devs/:devId/dislikes", dislikeController.store)
routes.post("/devs/:devId/superlikes", superlikeController.store)
routes.get("/devs", devController.index);


module.exports = routes;

