/*
    API call
*/
var webConfig = require('../webconfig');
var serviceQuake = require('../services/serviceQuake');
module.exports = (app) =>{

    /* Search all games */
    app.get(`/api/version_${webConfig.version}/games`, (req, res)=> {
        serviceQuake.getAllGames()
            .then(response => res.status(200).send(response))
            .catch(err => res.status(err.statusCode || 500).send(err))
    });
    
    /* Search single games */
    app.get(`/api/version_${webConfig.version}/games/:codGame`, (req, res)=> {
        serviceQuake.getSingleGame(req.params.codGame)
            .then(response => res.status(200).send(response))
            .catch(err => res.status(err.statusCode || 500).send(err))
    });
}