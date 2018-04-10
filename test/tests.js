var logParsedService = require('../services/logParsedServices.js');
var serviceQuake = require('../services/serviceQuake.js');
var app = require('../index.js');
var supertest = require('supertest');
var should = require("should");

describe("Teste de Leitura de Log", () => {
    it("Leitura de arquivo game.log", () => {
        return logParsedService.readFile('game.log').then(response => {
            should.exist(response);
        });
    });
});

describe("Teste de Métodos do Parsed", () => {
    it("getInitGame", (done) => {
        let game = logParsedService.getInitGame({}, 1);
        should.exist(game);
        done();
    });
    it("GetPlayer", () => {
        return logParsedService.readFile(`./test/testeLog.log`)
            .then(response => {
                should.exist(response);

                let game = {};
                logParsedService.getInitGame(game, 0);
                logParsedService.getPlayer(game.game_1, response.toString().trim());
                game["game_1"].should.have.property('players').with.lengthOf(1);
                game["game_1"]["players"][0].should.equal('Isgalamido');
                game["game_1"].should.have.property('kills');
                game["game_1"]["kills"].should.have.property('Isgalamido').equal(0);
            })
    });
});

describe("Teste de chamada das API", () => {
    it("Todos os jogos", (done) => {
        supertest(app)
            .get(`/api/version_1/games`)
            .expect(200)
        done();
    });
    it("Unico jogo", (done) => {
        supertest(app)
            .get(`/api/version_1/games/10`)
            .expect(200)
        done();
    });
    it("Jogo inexistente", (done) => {
        supertest(app)
            .get(`/api/version_1/games/50`)
            .expect(404)
        done();
    });
})
