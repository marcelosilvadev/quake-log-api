module.exports = {
    /* 
        Get file then parse
    */
    getFile: () => {
        return new Promise((resolve, reject) => {
            readFile('game.log').then(response => {
                let file = parsedFile(response);  
                return resolve(file);
            }).catch(err => {
                return reject(err);
            });
        });
    },
    getInitGame: (root, rounds) => {
        return getInitGame(root, rounds);
    },
    getKill: (round, line) => {
        return kill(round, line);
    },
    getPlayer: (round, line) => {
        return instancePlayers(round, line);
    }
}

/* 
    Reads game.log file 
*/
function readFile(filename) {
    return new Promise((resolve, reject) => {
        var fs = require('fs');
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(data.trim().split('\n'));
        });
    })
}

/* 
    Data processing
*/
function parsedFile(lines) {
    let rounds = 0;
    let players = [];
    let root = {};

    lines.forEach((line) => {
        if (line.indexOf('InitGame') !== -1) {
            rounds = getInitGame(root, rounds);
        }

        if (line.indexOf('killed') !== -1) {
            kill(root[`game_${rounds}`], line);
        }
        
        if (line.indexOf('ClientUserinfoChanged') !== -1){
            instancePlayers(root[`game_${rounds}`], line);
        }
    });
    return root;
}

/* 
    Get initial games
*/
function getInitGame(root, rounds) {
    root[`game_${++rounds}`] = {
        total_kills: 0,
        players: [],
        kills: {}
    }
    return rounds;
}

function kill(round, line) {
    round.total_kills++;
    getKills(round.kills, line);
}

/* 
    Get players' death (Kills and Killer) 
*/
function getKills(kills, line) {

    // Checks if <world> killed Player (Suicide)
    if (line.indexOf('<world>') !== -1) {
        let killed = line.split('killed')[1].split('by')[0].trim();
        instanceKills(kills, killed);
        kills[killed]--;
    }
    else {
        let killer = line.split('killed')[0].split(':')[3].trim();
        let killed = line.split('killed')[1].split('by')[0].trim();

        instanceKills(kills, killed);
        instanceKills(kills, killer);

        if (killer != killed)
            kills[killer]++;
    }
}

function instanceKills(kills, playername){
    if(kills[playername] == null){
        kills[playername] = 0;
    }
}

/* 
    Search players in File
*/
function instancePlayers(round, line) {
    let playername = line.split('n\\')[1].split('\\t')[0];
    getPlayers(round.players, playername);
    instanceKills(round.kills, playername);
}

function getPlayers(players, playername) {
    if ((players.indexOf(playername) === -1)) {
        players.push(playername);
    }
}

/* 
    Reads game.log file 
*/
function readFile(filename) {
    return new Promise((resolve, reject) => {
        var fs = require('fs');
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(data.trim().split('\n'));
        });
    })
}