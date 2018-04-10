var logParseService = require('./logParsedServices');
module.exports = {

    getAllGames: () => logParseService.getFile(),

    getSingleGame: (game) => {
        return new Promise((resolve, reject) => {
            logParseService.getFile().then(data => {
                let codGame = `game_${game}`;
                if (data[codGame] != null) {
                    return resolve(data[codGame]);
                }
                return reject({
                    err: 'Jogo não encontrado !',
                    statusCode: 404
                });
            })
                .catch(err => {
                    return reject(err);
                })
        })
    }
}