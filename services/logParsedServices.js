module.exports = {
    /* 
        Get file then parse
    */
    getFile: () => {
        return new Promise((resolve, reject) => {
            readFile('game.log').then(response => {
                let file = response;  
                return resolve(file);
            }).catch(err => {
                return reject(err);
            });
        });
    },
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